import * as os from 'os'

export function getIPAddresses(): string[] {
  let networkInterfaces: object = os.networkInterfaces()
  let addresses: string[] = Object.keys(networkInterfaces)
    .filter(i => i.includes('wlan') || i.includes('eth'))
    .map(i => networkInterfaces[i])
    .flat()
    .filter(i => !i.internal && i.family === 'IPv4')
    .map(i => i.address)

  return addresses
}

export function getIPAddress(): string | null {
  return getIPAddresses()[0] ?? null
}
