import { getIPAddress } from './utils'
import BalenaAudio from 'balena-audio'
import {CecMonitor, Remote} from "hdmi-cec";

interface DeviceConfig {
  ip: string
}

export default class SoundConfig {
  public device: DeviceConfig = {
    ip: getIPAddress() ?? 'localhost'
  }
  private audioBlock: BalenaAudio
  private cecMonitor: CecMonitor

  bindAudioBlock(audioBlock: BalenaAudio) {
    this.audioBlock = audioBlock
  }

  bindCecMonitor(cecMonitor: CecMonitor) {
    this.cecMonitor = cecMonitor
  }

  getCecMonitor(): CecMonitor {
    return this.cecMonitor
  }
}