import React, {createContext, useEffect, useState} from "react"
import fclConfig from "src/fclConfig"
import {Spinner} from "../components/Spinner"

interface RuntimeConfig {
  flowAvatarUrl: string
  baseUrl: string
  contractFungibleToken: string
  contractFlowToken: string
  contractFUSD: string
  contractFCLCrypto: string
  flowAccountAddress: string
  flowAccountPrivateKey: string
  flowAccountPublicKey: string
  flowAccountKeyId: string
  flowAccessNode: string
  flowInitAccountsNo: number
  flowInitAccountBalance: string
}

const defaultConfig = {
  flowAvatarUrl: process.env.flowAvatarUrl || "https://avatars.onflow.org/avatar/",
  baseUrl: process.env.baseUrl || "http://localhost:8701",
  contractFungibleToken: process.env.contractFungibleToken || "0xee82856bf20e2aa6",
  contractFlowToken: process.env.contractFlowToken || "0x0ae53cb6e3f42a79",
  contractFUSD: process.env.contractFUSD || "0xf8d6e0586b0a20c7",
  contractFCLCrypto: process.env.contractFCLCrypto || "0xf8d6e0586b0a20c7",
  flowAccountAddress: process.env.flowAccountAddress || "0xf8d6e0586b0a20c7",
  flowAccountPrivateKey: process.env.flowAccountPrivateKey || "f8e188e8af0b8b414be59c4a1a15cc666c898fb34d94156e9b51e18bfde754a5",
  flowAccountPublicKey: process.env.flowAccountPublicKey || "6e70492cb4ec2a6013e916114bc8bf6496f3335562f315e18b085c19da659bdfd88979a5904ae8bd9b4fd52a07fc759bad9551c04f289210784e7b08980516d2",
  flowAccountKeyId: process.env.flowAccountKeyId || "0",
  flowAccessNode: process.env.flowAccessNode || "http://localhost:8888",
  flowInitAccountsNo: parseInt(process.env.flowInitAccountsNo || "0") || 0,
  flowInitAccountBalance: process.env.flowInitAccountBalance || "1000.0",
}

export const ConfigContext = createContext<RuntimeConfig>(defaultConfig)

async function getConfig(): Promise<RuntimeConfig> {
  if (process.env.isLocal) {
    return defaultConfig
  }

  if (true) {
    return defaultConfig
  }

  const result = await fetch("http://localhost:8701/api/")
    .then(res => res.json())
    .catch(e => {
      console.log(
        `Warning: Failed to fetch config from API. 
         If you see this warning during CI you can ignore it.
         Returning default config.
         ${e}
          `
      )
      return defaultConfig
    })

  return result
}

export function ConfigContextProvider({children}: {children: React.ReactNode}) {
  const [config, setConfig] = useState<RuntimeConfig>()

  useEffect(() => {
    async function fetchConfig() {
      const config = await getConfig()

      const {
        flowAccessNode,
        flowAccountAddress,
        contractFungibleToken,
        contractFlowToken,
        contractFUSD,
      } = config

      fclConfig(
        flowAccessNode,
        flowAccountAddress,
        contractFungibleToken,
        contractFlowToken,
        contractFUSD
      )

      setConfig(config)
    }

    fetchConfig()
  }, [])

  if (!config) return <Spinner />

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}
