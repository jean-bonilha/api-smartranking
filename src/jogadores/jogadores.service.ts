import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v1 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {

  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

    const { email } = criarJogadorDto

    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto)
    } else {
      this.criar(criarJogadorDto)
    }

  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores
  }

  async consultarJogadorPeloEmail(email:string): Promise<Jogador[]> {
    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado!`)
    }

    return [jogadorEncontrado]
  }

  async deletarJogador(email): Promise<void> {

    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

    this.jogadores = this.jogadores.filter(jogador => jogador.email !== email)

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

  private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto):void {
    const { nome } = criarJogadorDto
    jogadorEncontrado.nome = nome
  }
}
