import * as fcl from "@onflow/fcl"
import {Buffer} from "buffer"
import {yup, nope} from "../util"

import {invariant} from "@onflow/util-invariant"
import {sansPrefix} from "@onflow/util-address"
import {WalletUtils} from "@onflow/fcl"

const ACCOUNT_PROOF = "ACCOUNT_PROOF"
const USER_SIGNATURE = "USER_SIGNATURE"

export const validateArgs = args => {
  if (args.appIdentifier) {
    const {appIdentifier, address, nonce, signatures} = args
    invariant(
      typeof appIdentifier === "string",
      "verifyAccountProof({ appIdentifier }) -- appIdentifier must be a string"
    )
    invariant(
      typeof address === "string" && sansPrefix(address).length === 16,
      "verifyAccountProof({ address }) -- address must be a valid address"
    )
    invariant(/^[0-9a-f]+$/i.test(nonce), "nonce must be a hex string")
    invariant(
      Array.isArray(signatures) &&
        signatures.every((sig, i, arr) => sig.f_type === "CompositeSignature"),
      "Must include an Array of CompositeSignatures to verify"
    )
    invariant(
      signatures.map(cs => cs.addr).every((addr, i, arr) => addr === arr[0]),
      "User signatures to be verified must be from a single account address"
    )
    return true
  } else {
    const {message, compSigs} = args
    invariant(
      /^[0-9a-f]+$/i.test(message),
      "Signed message must be a hex string"
    )
    invariant(
      Array.isArray(compSigs) &&
        compSigs.every((sig, i, arr) => sig.f_type === "CompositeSignature"),
      "Must include an Array of CompositeSignatures to verify"
    )
    invariant(
      compSigs.map(cs => cs.addr).every((addr, i, arr) => addr === arr[0]),
      "User signatures to be verified must be from a single account address"
    )
    return true
  }
}

const getVerifySignaturesScript = async (sig, opts) => {
  const verifyFunction =
    sig === "ACCOUNT_PROOF"
      ? "verifyAccountProofSignatures"
      : "verifyUserSignatures"

  return `
      
      pub fun verifyUserSignatures(
        address: Address,
        message: String,
        keyIndices: [Int],
        signatures: [String]
    ): Bool {
        return verifySignatures(
            address: address,
            message: message,
            keyIndices: keyIndices,
            signatures: signatures,
            domainSeparationTag: "FLOW-V0.0-user",
        )
    }

    pub fun verifyAccountProofSignatures(
        address: Address,
        message: String,
        keyIndices: [Int],
        signatures: [String]
    ): Bool {
        return verifySignatures(
            address: address,
            message: message,
            keyIndices: keyIndices,
            signatures: signatures,
            domainSeparationTag: "FCL-ACCOUNT-PROOF-V0.0",
        ) || 
        verifySignatures(
            address: address,
            message: message,
            keyIndices: keyIndices,
            signatures: signatures,
            domainSeparationTag: "FLOW-V0.0-user",
        )
    }

    pub fun verifySignatures(
        address: Address,
        message: String,
        keyIndices: [Int],
        signatures: [String],
        domainSeparationTag: String,
    ): Bool {
        pre {
            keyIndices.length == signatures.length : "Key index list length does not match signature list length"
        }

        let account = getAccount(address)
        let messageBytes = message.decodeHex()

        var totalWeight: UFix64 = 0.0
        let seenKeyIndices: {Int: Bool} = {}

        var i = 0

        for keyIndex in keyIndices {

            let accountKey = account.keys.get(keyIndex: keyIndex) ?? panic("Key provided does not exist on account")
            let signature = signatures[i].decodeHex()

            // Ensure this key index has not already been seen

            if seenKeyIndices[accountKey.keyIndex] ?? false {
                return false
            }

            // Record the key index was seen

            seenKeyIndices[accountKey.keyIndex] = true

            // Ensure the key is not revoked

            if accountKey.isRevoked {
                return false
            }

            // Ensure the signature is valid

            if !accountKey.publicKey.verify(
                signature: signature,
                signedData: messageBytes,
                domainSeparationTag: domainSeparationTag,
                hashAlgorithm: accountKey.hashAlgorithm
            ) {
                return false
            }

            totalWeight = totalWeight + accountKey.weight

            i = i + 1
        }
        
        return totalWeight >= 1000.0
    }

      pub fun main(
          address: Address, 
          message: String, 
          keyIndices: [Int], 
          signatures: [String]
      ): Bool {
        return ${verifyFunction}(address: address, message: message, keyIndices: keyIndices, signatures: signatures)
      }
    `
}

/**
 * Verify a valid account proof signature or signatures for an account on Flow.
 *
 * @param {string} appIdentifier - A message string in hexadecimal format
 * @param {Object} accountProofData - An object consisting of address, nonce, and signatures
 * @param {string} accountProofData.address - A Flow account address
 * @param {string} accountProofData.nonce - A random string in hexadecimal format (minimum 32 bytes in total, i.e. 64 hex characters)
 * @param {Object[]} accountProofData.signatures - An array of composite signatures to verify
 * @param {Object} [opts={}] - Options object
 * @param {string} opts.fclCryptoContract - An optional override Flow account address where the FCLCrypto contract is deployed
 * @return {bool}
 *
 * @example
 *
 *  const accountProofData = {
 *   address: "0x123",
 *   nonce: "F0123"
 *   signatures: [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: "0x123", keyId: 0, signature: "abc123"}],
 *  }
 *
 *  const isValid = await fcl.AppUtils.verifyAccountProof(
 *    "AwesomeAppId",
 *    accountProofData,
 *    {fclCryptoContract}
 *  )
 */

async function verifyAccountProof(
  appIdentifier,
  {address, nonce, signatures},
  opts = {}
) {
  validateArgs({appIdentifier, address, nonce, signatures})

  const message = WalletUtils.encodeAccountProof(
    {address, nonce, appIdentifier},
    false
  )

  let signaturesArr = []
  let keyIndices = []

  for (const el of signatures) {
    signaturesArr.push(el.signature)
    keyIndices.push(el.keyId)
  }

  return fcl.query({
    cadence: await getVerifySignaturesScript(ACCOUNT_PROOF, opts),
    args: (arg, t) => [
      arg(address, t.Address),
      arg(message, t.String),
      arg(keyIndices, t.Array([t.Int])),
      arg(signaturesArr, t.Array([t.String])),
    ],
  })
}

/**
 * Verify a valid signature/s for an account on Flow.
 *
 * @param {string} message - A message string in hexadecimal format
 * @param {Array} compSigs - An array of Composite Signatures
 * @param {string} compSigs[].addr - The account address
 * @param {number} compSigs[].keyId - The account keyId
 * @param {string} compSigs[].signature - The signature to verify
 * @param {Object} [opts={}] - Options object
 * @return {bool}
 *
 * @example
 *
 *  const isValid = await fcl.AppUtils.verifyUserSignatures(
 *    Buffer.from('FOO').toString("hex"),
 *    [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: "0x123", keyId: 0, signature: "abc123"}],
 *    {fclCryptoContract}
 *  )
 */
async function verifyUserSignatures(message, compSigs, opts = {}) {
  validateArgs({message, compSigs})

  const address = compSigs[0].addr
  let signaturesArr = []
  let keyIndices = []

  for (const el of compSigs) {
    signaturesArr.push(el.signature)
    keyIndices.push(el.keyId)
  }

  return fcl.query({
    cadence: await getVerifySignaturesScript(USER_SIGNATURE, opts),
    args: (arg, t) => [
      arg(address, t.Address),
      arg(message, t.String),
      arg(keyIndices, t.Array([t.Int])),
      arg(signaturesArr, t.Array([t.String])),
    ],
  })
}

const toHexStr = str => {
  return Buffer.from(str).toString("hex")
}

export const LABEL = "User Sign & Verify"
export const CMD = async () => {
  const MSG = toHexStr("FOO")

  try {
    const res = await fcl.currentUser().signUserMessage(MSG)

    return verifyUserSignatures(MSG, res).then(yup(LABEL)).catch(nope(LABEL))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return nope(LABEL)(error)
  }
}
