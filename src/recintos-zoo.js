class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, ocupacao: 3, animais: ['MACACO'] },
      { numero: 2, bioma: 'floresta', tamanho: 5, ocupacao: 0, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupacao: 2, animais: ['CORRIDA'] },
      { numero: 4, bioma: 'Rio', tamanho: 8, ocupacao: 0, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, ocupacao: 3, animais: ['LEAO'] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['Rio'], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      CORRIDA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'Rio'], carnivoro: false }
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }
    
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, bioma, carnivoro } = this.animais[animal];
    const espacoNecessario = quantidade * tamanho;
    let recintosViaveis = [];

    for (let recinto of this.recintos) {
      // Observa se a compatibilidade do bioma
      if (!bioma.includes(recinto.bioma) && !(recinto.bioma === 'savana e rio' && bioma.includes('savana'))) {
        continue;
      }

      let espacoLivre = recinto.tamanho - recinto.ocupacao;
      let compatibilidade = true;

      // Observa a compatibilidade de espécies e espaço para carnívoros
      if (carnivoro) {
        if (recinto.animais.length > 0 && (recinto.animais[0] !== animal || recinto.animais.length > 1)) {
          compatibilidade = false;
        }
      } else {
        if (recinto.animais.some(a => this.animais[a].carnivoro)) {
          compatibilidade = false;
        }
      }

      // Verifica regra específica para hipopótamo
      if (recinto.animais.includes('HIPOPOTAMO') && recinto.bioma !== 'savana e rio') {
        compatibilidade = false;
      }

      // considera espaço extra ao adicionar nova espécie
      if (compatibilidade && espacoLivre >= espacoNecessario) {
        let novoEspacoLivre = espacoLivre - espacoNecessario;

        if (recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
          novoEspacoLivre -= 1; // Considera espaço extra se uma nova espécie for adicionada
        }

        // conforto dos macacos
        if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) {
          continue; 
        }

        if (compatibilidade && novoEspacoLivre >= 0) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${novoEspacoLivre} total: ${recinto.tamanho})`);
        }
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
