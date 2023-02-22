import React, {useEffect} from "react"
import decorate from "../src/harness/decorate"
import {COMMANDS} from "../src/harness/cmds"
import useCurrentUser from "../src/harness/hooks/use-current-user"
import useConfig from "../src/harness/hooks/use-config"
import * as fcl from "@onflow/fcl"

const renderCommand = (d: any) => {
  return (
    <li key={d.LABEL}>
      <button onClick={d.CMD}>{d.LABEL}</button>
    </li>
  )
}

export default function Page() {
  useEffect(() => {
    decorate()
    // prettier-ignore
    fcl.config()
      .put('app.detail.title', 'Test Harness')
      .put('app.detail.icon', 'https://placekitten.com/g/200/200')
      .put('service.OpenID.scopes', 'email')
      .put('fcl.appDomainTag', 'harness-app')
      .put('flow.network', 'local')
      .put('env', 'local')
      .put('accessNode.api', 'http://localhost:8888')
      .put('discovery.wallet', baseUrl + '/fcl/authn')
  }, [])

  const baseUrl = window.location.protocol + "//" + window.location.host
  const currentUser = useCurrentUser()
  const config = useConfig()

  return (
    <div>
      <ul>{COMMANDS.map(renderCommand)}</ul>
      <pre>{JSON.stringify({currentUser, config}, null, 2)}</pre>
    </div>
  )
}
