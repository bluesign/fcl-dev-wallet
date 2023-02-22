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
  flowInitAccountsNo: string
  flowInitAccountBalance: string
}

const defaultConfig = {
  baseUrl: "http://localhost:8701",
  contractFCLCrypto: "0xf8d6e0586b0a20c7",
  contractFUSD: "0xf8d6e0586b0a20c7",
  contractFlowToken: "0x0ae53cb6e3f42a79",
  contractFungibleToken: "0xee82856bf20e2aa6",
  flowAccessNode: "http://localhost:8888",
  flowAccountAddress: "0xf8d6e0586b0a20c7",
  flowAccountKeyId: "0",
  flowAccountPrivateKey:
    "f8e188e8af0b8b414be59c4a1a15cc666c898fb34d94156e9b51e18bfde754a5",
  flowAccountPublicKey:
    "6e70492cb4ec2a6013e916114bc8bf6496f3335562f315e18b085c19da659bdfd88979a5904ae8bd9b4fd52a07fc759bad9551c04f289210784e7b08980516d2",
  flowAvatarUrl: "https://avatars.onflow.org/avatar/",
  flowInitAccountBalance: "1000.0",
  flowInitAccountsNo: "0",
}

export const ConfigContext = createContext<RuntimeConfig>(defaultConfig)

async function getConfig(): Promise<RuntimeConfig> {
  Object.assign(defaultConfig, process.env)

  if (process.env.isLocal) {
    return defaultConfig
  }

  return await fetch("http://localhost:8701/api/")
    .then(res => res.json())
    .then(remoteConfig => {
      return Object.assign(defaultConfig, remoteConfig)
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.log(
        `Warning: Failed to fetch config from API. 
         If you see this warning during CI you can ignore it.
         Returning default config.
         ${e}
          `
      )
      return defaultConfig
    })
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
