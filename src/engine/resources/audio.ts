/**
 * Module for handling audio loading and playback.
 * @module engine/resources/audio
 */

import {AudioError} from '../helpers/error';
import {
  getResource,
  hasResource,
  loadDecodeParse,
  unloadResource,
} from '../internal/resourceMap';

let _audioContext: AudioContext | null;
let _bgm: AudioBufferSourceNode | null;
let _bgmGain: GainNode;
let _cueGain: GainNode;
let _masterGain: GainNode;

const DEFAULT_MASTER_GAIN = 0.1;
const DEFAULT_BGM_GAIN = 1;
const DEFAULT_CUE_GAIN = 1;

/**
 * Decode function for audio resources.
 * To be used in conjunction with {@link loadDecodeParse}.
 */
function decodeAudio(data: Response) {
  return data.arrayBuffer();
}

/**
 * Parse function for audio resources.
 * To be used in conjunction with {@link loadDecodeParse}.
 * @throws {AudioError} - If the audio context is not initialized.
 */
function parseAudio(data: ArrayBuffer) {
  if (!_audioContext) {
    throw new AudioError('Audio context not initialized');
  }
  return _audioContext.decodeAudioData(data);
}

/**
 * Loads the audio resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {Promise<void>} - A promise that resolves when the resource is loaded.
 * @example
 * await loadAudio('path/to/resource');
 * // audio resource is now loaded
 * // subsequent calls to getAudio() will return the audio resource
 */
export function loadAudio(path: string) {
  return loadDecodeParse(path, decodeAudio, parseAudio);
}

/**
 * Unloads the audio resource at the given path.
 * @param {string} path - The path to the resource.
 * @returns {void}
 * @example
 * unloadAudio('path/to/resource');
 * // audio resource is now unloaded
 * // subsequent calls to getAudio() will throw an error
 */
export function unloadAudio(path: string) {
  unloadResource(path);
}

/**
 * Gets the audio resource at the given path.
 * @throws {ResourceError} - If the resource is not in the resource map.
 * @param {string} path - The path to the resource.
 * @returns {AudioBuffer | null} - The audio resource.
 * @example
 * const audio = getAudio('path/to/resource');
 * // audio is now the audio resource
 */
export function hasAudio(path: string) {
  return hasResource(path);
}

/**
 * Initializes the audio context.
 * @throws {AudioError} - If the audio context is not supported.
 * @returns {void}
 * @example
 * initAudio();
 * // audio context is now initialized
 */
export function initAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    _audioContext = new AudioContext();

    _masterGain = _audioContext.createGain();
    _masterGain.connect(_audioContext.destination);
    _masterGain.gain.value = DEFAULT_MASTER_GAIN;

    _bgmGain = _audioContext.createGain();
    _bgmGain.connect(_masterGain);
    _bgmGain.gain.value = DEFAULT_BGM_GAIN;

    _cueGain = _audioContext.createGain();
    _cueGain.connect(_masterGain);
    _cueGain.gain.value = DEFAULT_CUE_GAIN;
  } catch (e) {
    throw new AudioError('Web Audio is not supported');
  }
}

/**
 * Plays the cue audio resource at the given path.
 * Cue audio is played at a fixed volume and cannot be stopped.
 * @throws {AudioError} - If the audio context is not initialized.
 * @param {string} path - The path to the resource.
 * @param {number} volume - The volume to play the resource at.
 * @returns {void}
 * @example
 * playAudio('path/to/resource', 0.5);
 * // audio resource is now playing at 50% volume
 */
export function playCue(path: string, volume: number) {
  if (!_audioContext) {
    throw new AudioError('Audio context not initialized');
  }

  const source = _audioContext.createBufferSource();

  source.buffer = getResource(path);

  source.start(0);

  source.connect(_cueGain);
  _cueGain.gain.value = volume;
}

/**
 * Plays the background music audio resource at the given path.
 * Background music audio is played at a variable volume and can be controlled.
 * @throws {AudioError} - If the audio context is not initialized.
 * @param {string} path - The path to the resource.
 */
export function playBgm(path: string, volume: number) {
  if (!_audioContext) {
    throw new AudioError('Audio context not initialized');
  }

  if (hasResource(path)) {
    stopBgm();
    _bgm = _audioContext.createBufferSource();
    _bgm.buffer = getResource(path);
    _bgm.loop = true;
    _bgm.start(0);

    _bgm.connect(_bgmGain);
    setBgmVolume(volume);
  } else {
    throw new AudioError(`BGM not loaded: ${path}`);
  }
}

/**
 * Stops the background music audio resource.
 * @returns {void}
 * @example
 * stopBgm();
 * // audio resource is now stopped
 */
export function stopBgm() {
  if (_bgm) {
    _bgm.stop(0);
    _bgm = null;
  }
}

/**
 * Checks if the background music audio resource is playing.
 * @returns {boolean} - True if the background music audio resource is playing.
 * @example
 * const isPlaying = isBgmPlaying();
 * // isPlaying is now true if the background music audio resource is playing
 * // otherwise, isPlaying is false
 */
export function isBgmPlaying() {
  return _bgm !== null;
}

/**
 * Sets the volume of the background music audio resource.
 * @throws {AudioError} - If the audio context is not initialized.
 * @param {number} volume - The volume to play the resource at.
 * @returns {void}
 * @example
 * setBgmVolume(0.5);
 * // audio resource is now playing at 50% volume
 */
export function setBgmVolume(volume: number) {
  if (_bgmGain) {
    _bgmGain.gain.value = volume;
  }
}

/**
 * Increments the volume of the background music audio resource.
 * @throws {AudioError} - If the audio context is not initialized.
 * @param {number} volume - The volume to play the resource at.
 * @returns {void}
 * @example
 * incrementBgmVolume(0.1);
 * // audio resource is now playing at 10% higher volume
 * // if the volume is negative, the volume is set to 0
 */
export function incrementBgmVolume(volume: number) {
  if (_bgmGain) {
    _bgmGain.gain.value += volume;
  }

  if (_bgmGain.gain.value < 0) {
    setBgmVolume(0);
  }
}

/**
 * Sets the volume of the cue audio resource.
 * @throws {AudioError} - If the audio context is not initialized.
 * @param {number} volume - The volume to play the resource at.
 * @returns {void}
 * @example
 * setBgmVolume(0.5);
 * // audio resource is now playing at 50% volume
 */
export function setMasterVolume(volume: number) {
  if (_masterGain) {
    _masterGain.gain.value = volume;
  }
}

/**
 * Increments the volume of the cue audio resource.
 * @throws {AudioError} - If the audio context is not initialized.
 * @param {number} volume - The volume to increment the resource by.
 * @returns {void}
 * @example
 * // assume the background music volume is 0.5
 * incrementBgmVolume(0.1);
 * // audio resource is now playing at 60% volume
 * // if the volume is negative, the volume is set to 0
 */
export function incrementMasterVolume(volume: number) {
  if (_masterGain) {
    _masterGain.gain.value += volume;
  }

  if (_masterGain.gain.value < 0) {
    setMasterVolume(0);
  }
}

/**
 * Cleans up the audio context.
 * @throws {AudioError} - If the audio context is not initialized.
 * @returns {void}
 * @example
 * cleanupAudio();
 * // audio context is now cleaned up
 */
export function cleanupAudio() {
  if (!_audioContext) {
    throw new AudioError('Audio context not initialized');
  }

  _audioContext.close();
  _audioContext = null;
}
