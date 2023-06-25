(function() {
  const vineSounds = {
    heart: chrome.runtime.getURL('sounds/dva-heart.mp3'),
    '+1': chrome.runtime.getURL('sounds/dva-+1.mp3'),
    '-1': chrome.runtime.getURL('sounds/dva--1.mp3'),
    laugh: chrome.runtime.getURL('sounds/dva-laugh.mp3'),
    hooray: chrome.runtime.getURL('sounds/dva-hooray.mp3'),
    confused: chrome.runtime.getURL('sounds/dva-confused.mp3'),
    ban: chrome.runtime.getURL('sounds/vine-boom.mp3'),
    eyes: chrome.runtime.getURL('sounds/dva-confused.mp3'),
    unreact: chrome.runtime.getURL('sounds/dva-unreact.mp3'),
  }

  const marioSounds = {
    heart: chrome.runtime.getURL('sounds/mario-one-up.mp3'),
    '+1': chrome.runtime.getURL('sounds/mario-coin.mp3'),
    '-1': chrome.runtime.getURL('sounds/mario-fireball.wav'),
    laugh: chrome.runtime.getURL('sounds/mario-stamp.mp3'),
    hooray: chrome.runtime.getURL('sounds/mario-gift.mp3'),
    confused: chrome.runtime.getURL('sounds/mario-pause.wav'),
    ban: chrome.runtime.getURL('sounds/mario-gift.mp3'),
    eyes: chrome.runtime.getURL('sounds/mario-pause.wav'),
    unreact: chrome.runtime.getURL('sounds/mario-kick.wav'),
  }

  const bastionSounds = {
    heart: chrome.runtime.getURL('sounds/bastion-heart.mp3'),
    '+1': chrome.runtime.getURL('sounds/bastion-+1.mp3'),
    '-1': chrome.runtime.getURL('sounds/bastion--1.mp3'),
    laugh: chrome.runtime.getURL('sounds/bastion-laugh.mp3'),
    hooray: chrome.runtime.getURL('sounds/bastion-hooray.mp3'),
    confused: chrome.runtime.getURL('sounds/bastion-confused.mp3'),
    ban: chrome.runtime.getURL('sounds/bastion-hooray.mp3'),
    eyes: chrome.runtime.getURL('sounds/bastion-confused.mp3'),
    unreact: chrome.runtime.getURL('sounds/bastion-unreact.mp3'),
  }

  const dvaSounds = {
    heart: chrome.runtime.getURL('sounds/dva-heart.mp3'),
    '+1': chrome.runtime.getURL('sounds/dva-+1.mp3'),
    '-1': chrome.runtime.getURL('sounds/dva--1.mp3'),
    laugh: chrome.runtime.getURL('sounds/dva-laugh.mp3'),
    hooray: chrome.runtime.getURL('sounds/dva-hooray.mp3'),
    confused: chrome.runtime.getURL('sounds/dva-confused.mp3'),
    ban: chrome.runtime.getURL('sounds/dva-hooray.mp3'),
    eyes: chrome.runtime.getURL('sounds/dva-confused.mp3'),
    unreact: chrome.runtime.getURL('sounds/dva-unreact.mp3'),
  }

  const zeldaSounds = {
    heart: chrome.runtime.getURL('sounds/zelda-get-heart.wav'),
    '+1': chrome.runtime.getURL('sounds/zelda-text.wav'),
    '-1': chrome.runtime.getURL('sounds/zelda-bomb.wav'),
    laugh: chrome.runtime.getURL('sounds/zelda-rupee.wav'),
    hooray: chrome.runtime.getURL('sounds/zelda-fanfare.wav'),
    confused: chrome.runtime.getURL('sounds/zelda-enemy-die.wav'),
    ban: chrome.runtime.getURL('sounds/zelda-fanfare.wav'),
    eyes: chrome.runtime.getURL('sounds/zelda-enemy-die.wav'),
    unreact: chrome.runtime.getURL('sounds/zelda-sword-slash.wav'),
  }

  const warcraftOrcSounds = {
    heart: chrome.runtime.getURL('sounds/orc-slo-boo.wav'),
    '+1': chrome.runtime.getURL('sounds/orc-okay.wav'),
    '-1': chrome.runtime.getURL('sounds/orc-death.wav'),
    laugh: chrome.runtime.getURL('sounds/orc-laugh.wav'),
    hooray: chrome.runtime.getURL('sounds/orc-kaboom.wav'),
    confused: chrome.runtime.getURL('sounds/orc-confused.wav'),
    ban: chrome.runtime.getURL('sounds/orc-kaboom.wav'),
    eyes: chrome.runtime.getURL('sounds/orc-confused.wav'),
    unreact: chrome.runtime.getURL('sounds/orc-spell.wav'),
  }

  const warcraftHumanSounds = {
    heart: chrome.runtime.getURL('sounds/alliance-okay.wav'),
    '+1': chrome.runtime.getURL('sounds/alliance-yes.wav'),
    '-1': chrome.runtime.getURL('sounds/alliance-death.wav'),
    laugh: chrome.runtime.getURL('sounds/alliance-all-right.wav'),
    hooray: chrome.runtime.getURL('sounds/alliance-right-o.wav'),
    confused: chrome.runtime.getURL('sounds/alliance-auch.wav'),
    ban: chrome.runtime.getURL('sounds/alliance-right-o.wav'),
    eyes: chrome.runtime.getURL('sounds/alliance-auch.wav'),
    unreact: chrome.runtime.getURL('sounds/alliance-invisibility.wav'),
  }

  class SoundsOfYouTube {
    constructor(volume, soundPack, unreactSound) {
      this.volume = volume || '0.5'
      this.soundPack = soundPack || 'vine'
      this.unreactSound = typeof unreactSound === 'undefined' ? true : unreactSound
    }

    getSource(type) {
      if (this.soundPack === 'vine') {
        return vineSounds[type]
      }
      if (this.soundPack === 'mario') {
        return marioSounds[type]
      }
      if (this.soundPack === 'overwatch-bastion') {
        return bastionSounds[type]
      }
      if (this.soundPack === 'overwatch-dva') {
        return dvaSounds[type]
      }
      if (this.soundPack === 'zelda') {
        return zeldaSounds[type]
      }
      if (this.soundPack === 'warcraft-orc') {
        return warcraftOrcSounds[type]
      }
      if (this.soundPack === 'warcraft-human') {
        return warcraftHumanSounds[type]
      }
      return null
    }

    playSound(src) {
      const sound = new Howl({ src, volume: this.volume })
      sound.play()
    }
/* 
    getReactionType(button) {
      let type = button.getAttribute('data-reaction-label') || button.value
      type = type.split(' ')[0].toLowerCase()
      if (type === 'smile') {
        return 'laugh'
      }
      if (type === 'tada') {
        return 'hooray'
      }
      if (type === 'thinking_face') {
        return 'confused'
      }
      return type
    }

    addReaction(event) {
      const button = event.currentTarget
      const type = this.getReactionType(button)
      const source = this.getSource(type)
      if (source) {
        this.playSound(source)
      }
    }

    removeReaction() {
      if (!this.unreactSound) {
        return
      }
      const source = this.getSource('unreact')
      if (source) {
        this.playSound(source)
      }
    }
     */
    ban(event) {
      const button = event.currentTarget;
      const source = this.getSource('ban');
      if (source) {
        this.playSound(source);
      }
    }
  }

  SoundsOfYouTubeStorage.load().then(options => {
    let unreactSound = true
    if (options.unreactSound === 'no') {
      unreactSound = false
    }
    const soundsOfYouTube = new SoundsOfYouTube(options.volume, options.soundPack, unreactSound)
    // Ban button
    $('body').on('click', '#ban-button, ytcp-menu-service-item-renderer:contains("Hide user from channel")', e => soundsOfYouTube.ban(e));

/* 
    // Add reaction
    $('body').on('click', '.js-reaction-option-item', e => soundsOfYouTube.addReaction(e))
    $('body').on('click',
                 'button.reaction-summary-item:not(.user-has-reacted):not(.add-reaction-btn)',
                 e => soundsOfYouTube.addReaction(e))

    // Remove reaction
    $('body').on('click', 'button.user-has-reacted', () => soundsOfYouTube.removeReaction())
     */
  })
})()
