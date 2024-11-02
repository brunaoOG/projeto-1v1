const defaultCharacter = {
  name: "",
  maxLife: 1,
  life: 1,
  attack: 0,
  defense: 0,
};

const createKnight = (name) => {
  return {
    ...defaultCharacter,
    name,
    maxLife: 100,
    life: 100,
    attack: 10,
    defense: 8,
  };
};

const createSorcerer = (name) => {
  return {
    ...defaultCharacter,
    name,
    maxLife: 50,
    life: 50,
    attack: 14,
    defense: 3,
  };
};

const createLittleMonster = () => {
  return {
    ...defaultCharacter,
    name: "Little Monster",
    maxLife: 40,
    life: 40,
    attack: 4,
    defense: 4,
  };
};

const createBigMonster = () => {
  return {
    ...defaultCharacter,
    name: "Big Monster",
    maxLife: 120,
    life: 120,
    attack: 16,
    defense: 6,
  };
};

const stage = {
  fighter1: null,
  fighter2: null,
  fighter1El: null,
  fighter2El: null,
  start(fighter1, fighter2, fighter1El, fighter2El) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;

    this.fighter1El.querySelector(".attack").addEventListener("click", () => {
      attack.doAttack(this.fighter1, this.fighter2);
    });
    this.fighter2El.querySelector(".attack").addEventListener("click", () => {
      attack.doAttack(this.fighter2, this.fighter1);
    });

    this.update();
  },

  update() {
    // NOME
    this.fighter1El.querySelector(".name").innerHTML = `${
      this.fighter1.name
    } - ${this.fighter1.life.toFixed(1)} HP`;
    this.fighter2El.querySelector(".name").innerHTML = `${
      this.fighter2.name
    } - ${this.fighter2.life.toFixed(1)} HP`;

    // HP
    this.fighter1El.querySelector(".lifebar .bar").style.width = `${
      (this.fighter1.life / this.fighter1.maxLife) * 100
    }%`;
    this.fighter2El.querySelector(".lifebar .bar").style.width = `${
      (this.fighter2.life / this.fighter2.maxLife) * 100
    }%`;
  },
};

const attack = {
  attacks: [],
  defenses: 0,
  doAttack(attacking, attacked) {
    if (attacking.life <= 0 || attacked.life <= 0) {
      log.register("O vencedor da batalha ja foi definido.");
      return;
    }
    let attackAccurancy = (Math.random() * 2).toFixed(2);
    let defenseAccurancy = (Math.random() * 2).toFixed(2);

    let attackEficiency = attacking.attack * attackAccurancy;
    let defenseEficiency = attacked.defense * defenseAccurancy;

    if (attackEficiency > defenseEficiency) {
      this.attacks.push(attackEficiency);
      attacked.life -= attackEficiency;
      attacked.life = attacked.life < 0 ? 0 : attacked.life;
      attacked.life == 0
        ? log.register(
            `${attacking.name} executou brutalmente ${
              attacked.name
            } com um ataque final de ${attackEficiency.toFixed(1)} de dano.`
          ) +
          log.register(
            `A batalha teve ${this.attacks.length} ataques, ${
              this.defenses
            } defesas, e somou ${this.getTotalDamage(this.attacks)} de dano.`
          )
        : log.register(
            `${attacking.name} deferiu ${attackEficiency.toFixed(
              1
            )} de dano ao ${attacked.name}`
          );
    } else {
      this.defenses++;
      log.register(`${attacked.name} defendeu o ataque de ${attacking.name}`);
    }

    stage.update();
  },
  getTotalDamage(array) {
    let sum = 0;
    for (let i of array) {
      sum += i;
    }
    return sum.toFixed();
  },
};

const log = {
  allLogs: [],
  logEl: document.querySelector(".log"),
  register(message) {
    if (typeof message !== "string") {
      console.log("Mensagem de tipo inadequado.");
      return;
    }
    let newLi = document.createElement("li");
    newLi.innerHTML = message;
    this.logEl.append(newLi);
    this.allLogs.push(message);
  },
};
