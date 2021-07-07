import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v1 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {

  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

    this.criar(criarJogadorDto)

  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {

    const { nome, email, telefoneCelular } = criarJogadorDto

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      email,
      telefoneCelular,
      ranking: 'A',
      urlFotoJogador: 'www.google.com/foto123.jpg',
      posicaoRanking: 1
    }

    this.logger.log(`crarJogadorDto: ${JSON.stringify(jogador)}`)
    this.jogadores.push(jogador)

  }
}
