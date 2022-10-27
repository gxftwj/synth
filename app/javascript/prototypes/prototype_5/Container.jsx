import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'
import SC_ToggleButtonSet from './SC_ToggleButtonSet'
import SC_Slider from './SC_Slider'


let synth
let pingPongDelay

export default class Container extends Component {
  constructor(props) {
    super(props)

    const synthSettings = {
      volume: -20,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'sawtooth',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const pingPongDelaySettings = { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 }

    this.state = {
      synthSettings,
      pingPongDelaySettings
    }
  }

  handleStart = () => {

    const { synthSettings, pingPongDelaySettings } = this.state
    synth = new Tone.Synth(synthSettings)

    pingPongDelay = new Tone.PingPongDelay(
      pingPongDelaySettings
    ).toDestination()


        synth.chain(pingPongDelay)

    // const distortionSettings = {
    //   wet: 1,
    //   distortion: 1,
    //   oversample: '4x'
    // }

    // const distortion = new Tone.Distortion(distortionSettings).toDestination()

    // const chorusSettings = {
    //   wet: 0.3,
    //   type: 'sine',
    //   frequency: 1.5,
    //   delayTime: 3.5,
    //   depth: 0.7,
    //   spread: 180
    // }

    // const chorus = new Tone.Chorus(chorusSettings).start()
    //

    // const jcReverbSettings = {
    //   wet: 1,
    //   roomSize: 0.3
    // }

    // const jcReverb = new Tone.JCReverb(jcReverbSettings).toDestination()

    // const freeverbSettings = {
    //   wet: 1,
    //   roomSize: 0.5,
    //   dampening: 10
    // }
    //
    // const freeverb = new Tone.Freeverb(freeverbSettings)

    // const channelSettings = { volume: 0, pan: 0, mute: false, solo: false }
    // const channel = new Tone.Channel(channelSettings).toDestination()

    // synth.triggerAttackRelease('C4', '1')


    // Тестовая мелодия
    const sequence = [
      {
        time: '0:0:0',
        noteName: 'C3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:0:2',
        noteName: 'A3',
        duration: '1n',
        velocity: 1
      },
      {
        time: '0:1:0',
        noteName: 'E3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:2:0',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:0',
        noteName: 'C3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:1',
        noteName: 'E3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:2',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'D3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:0',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:2',
        noteName: 'E4',
        duration: '4n',
        velocity: 0.7
      },
      {
        time: '1:1:3',
        noteName: 'D4',
        duration: '4n',
        velocity: 0.8
      },
      {
        time: '1:2:0',
        noteName: 'C3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:0',
        noteName: 'G3',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:2',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      }
   ]

    // Создаём партию, добавляем в неё секвенцию
    // и включаем проигрывание
    const part = new Tone.Part((time, note) => {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)

    // Указываем длительность партии
    part.loopEnd = '2m'

    // Включаем зацикливание
    part.loop = true

    // Включаем звук в браузере
    // sampler.context.resume()

    // Включаем отсчёт времени в Tone.js
    Tone.Transport.start()
  }

  handleOscillatorTypeChange = (property, value) => {
    const { synthSettings } = this.state
    synth.oscillator.type = value
    synthSettings.oscillator.type = value

    this.setState ({
      synthSettings
    })
  }

  render() {
    const { synthSettings } = this.state
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="Container">
        <SC_Button
          text="Art Design & Coding Community"
          handleClick={this.handleStart}
        />

        <SC_ToggleButtonSet
          name="Type"
          options={options}
          value={synthSettings.oscillator.type}
          property="type"
          handleChange={this.handleOscillatorTypeChange}
        />

        <SC_Slider
          name="Frequency"
          min={0}
          max={1000}
          step={1}
          value={oscillator.settings.frequency}
          property="frequency"
          handleChange={this.handleOscillatorPropertyChange}
        />

      </div>
    )
  }
}
