class SoundsOfYouTubeStorage {
  static load() {
    return new Promise(resolve => {
      chrome.storage.sync.get('soundsOfYouTube', allOptions => {
        const options = allOptions.soundsOfYouTube || {}
        resolve(options)
      })
    })
  }

  static save(opts) {
    return new Promise(resolve => {
      chrome.storage.sync.set({ soundsOfYouTube: opts }, () => {
        resolve()
      })
    })
  }
}

window.SoundsOfYouTubeStorage = SoundsOfYouTubeStorage
