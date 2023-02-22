/** @jsxImportSource theme-ui */
import {WalletUtils} from "@onflow/fcl"
import AuthzActions from "components/AuthzActions"
import AuthzDetails from "components/AuthzDetails"
import AuthzHeader from "components/AuthzHeader"
import Code from "components/Code"
import Dialog from "components/Dialog"
import {AuthzContextProvider} from "contexts/AuthzContext"
import useConfig from "hooks/useConfig"
import useAuthzContext from "hooks/useAuthzContext"
//import {useState} from "react"
import {sign} from "src/crypto"

function AuthzContent({
  flowAccountAddress,
  flowAccountPrivateKey,
  avatarUrl,
}: {
  flowAccountAddress: string
  flowAccountPrivateKey: string
  avatarUrl: string
}) {
  const {isExpanded, codePreview, currentUser, proposalKey, message} =
    useAuthzContext()
  //const [isLoading, setIsLoading] = useState<boolean>(false)

  const onApprove = () => {
    const signature = sign(flowAccountPrivateKey, message)

    WalletUtils.approve(
      new WalletUtils.CompositeSignature(
        currentUser.address,
        proposalKey.keyId,
        signature
      )
    )
    //setIsLoading(true)
  }

  const onDecline = () => WalletUtils.close()

  return (
    <Dialog
      title="Authorize Transaction"
      header={
        !isExpanded && (
          <AuthzHeader
            flowAccountAddress={flowAccountAddress}
            avatarUrl={avatarUrl}
          />
        )
      }
      footer={
        !isExpanded && (
          <AuthzActions
            onApprove={onApprove}
            isLoading={false}
            onDecline={onDecline}
          />
        )
      }
    >
      {!!codePreview ? (
        <Code title={codePreview.title} value={codePreview.value} />
      ) : (
        <AuthzDetails />
      )}
    </Dialog>
  )
}

function Authz() {
  const {flowAvatarUrl, flowAccountAddress, flowAccountPrivateKey} = useConfig()
  return (
    <AuthzContextProvider>
      <AuthzContent
        flowAccountAddress={flowAccountAddress}
        flowAccountPrivateKey={flowAccountPrivateKey}
        avatarUrl={flowAvatarUrl}
      />
    </AuthzContextProvider>
  )
}

export default Authz
