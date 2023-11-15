function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      }

      if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth >= 0) {
        this.winner = 'draw';
      }

      if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) return { width: '0%' };

      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) return { width: '0%' };

      return { width: this.playerHealth + '%' };
    },
    isSpecialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
    },
    attackMonster() {
      this.currentRound += 1;
      const damageValue = getRandomValue(5, 12);
      this.monsterHealth -= damageValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const damageValue = getRandomValue(8, 15);
      this.playerHealth -= damageValue;
    },
    specialAttackMonster() {
      this.currentRound += 1;
      const damageValue = getRandomValue(10, 25);
      this.monsterHealth -= damageValue;
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount('#game');
