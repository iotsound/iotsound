import BalenaAudio from 'balena-audio'
import SoundConfig from './SoundConfig'
import {CecMonitor, Remote} from 'hdmi-cec'
import { constants } from './constants'

// balenaSound core
const config: SoundConfig = new SoundConfig()
const audioBlock: BalenaAudio = new BalenaAudio(`tcp:${config.device.ip}:4317`)
config.bindAudioBlock(audioBlock)

const monitor = new CecMonitor(constants.deviceName)

monitor.on('ready', (cecMonitor: CecMonitor) => {
  console.log('CECMonitor is ready!')

  config.bindCecMonitor(cecMonitor)
})

init()
async function init() {
  await audioBlock.listen()
}

// Event: "play"
// Source: audio block
// On audio playback, set this server as the multiroom-master
// We check the input sink that receives all audio sources
audioBlock.on('play', async (sink: any) => {
  console.log(`[event] Sound started playing, sending CEC active source`)

  config.getCecMonitor().send("as")
})

audioBlock.on('stop', async (sink: any) => {
  console.log('[event] Audio has stopped playing, sending CEC inactive source')

  config.getCecMonitor().send("is")
})

audioBlock.on('connect', async (sink: any) => {
  console.log(`[event] Device connected, sending CEC active source`)

  config.getCecMonitor().send("as")
})

audioBlock.on('disconnect', async (sink: any) => {
  console.log(`[event] Device, sending CEC inactive source`)

  config.getCecMonitor().send("is")
})
