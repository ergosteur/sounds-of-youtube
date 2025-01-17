class OptionsPage {
  constructor() {
    this.findElements()
  }

  findElements() {
    this.volumeSlider = document.getElementById('volume')
    this.soundPackMenu = document.getElementById('sound-pack')
    this.versionEl = document.getElementById('extension-version')
    this.successEl = document.getElementById('save-message')
    this.unreactSoundYes = document.getElementById('unreact-sound-yes')
    this.unreactSoundNo = document.getElementById('unreact-sound-no')
    this.volumeLevelEl = document.getElementById('volume-level')
  }

  getManifest() {
    const url = chrome.runtime.getURL('manifest.json')
    return window.fetch(url).then(response => response.json())
  }

  setup() {
    SoundsOfYouTubeStorage.load().then(options => {
      this.options = options
      this.setSelectedVolume()
      this.setSelectedSoundPack()
      this.setUnreactSoundSelection()
      this.listenForChanges()
    })
    this.getManifest().then(this.showExtensionVersion.bind(this))
  }

  setUnreactSoundSelection() {
    const unreactSound = this.options.unreactSound || 'yes'
    if (unreactSound === 'yes') {
      this.unreactSoundYes.checked = true
    } else {
      this.unreactSoundNo.checked = true
    }
  }

  showExtensionVersion(manifest) {
    this.versionEl.textContent = manifest.version
  }

  setSelectedVolume() {
    this.volumeSlider.value = this.options.volume || '0.5'
    this.displayVolumeLevel()
  }

  displayVolumeLevel() {
    this.volumeLevelEl.textContent = parseFloat(this.volumeSlider.value) * 100 + '%'
  }

  setSelectedSoundPack() {
    const soundPack = this.options.soundPack || 'vine'
    for (let opt, i = 0; opt = this.soundPackMenu.options[i]; i++) {
      if (opt.value === soundPack) {
        this.soundPackMenu.selectedIndex = i
        break
      }
    }
  }

  listenForChanges() {
    this.volumeSlider.addEventListener('change', () => {
      this.displayVolumeLevel()
      this.saveOptions()
      this.volumeSlider.blur()
    })
    this.soundPackMenu.addEventListener('change', () => this.saveOptions())
    this.unreactSoundYes.addEventListener('change', () => this.saveOptions())
    this.unreactSoundNo.addEventListener('change', () => this.saveOptions())
  }

  saveOptions() {
    this.options.volume = this.volumeSlider.value
    this.options.soundPack = this.soundPackMenu.value
    this.options.unreactSound = this.unreactSoundYes.checked ? 'yes' : 'no'
    SoundsOfYouTubeStorage.save(this.options).then(() => {
      this.successEl.style.opacity = 1
      setTimeout(() => {
        this.successEl.style.opacity = 0
      }, 30000)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new OptionsPage()
  page.setup()
});
