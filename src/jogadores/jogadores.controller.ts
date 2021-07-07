import { Controller, Post, Get, Body, Query, Delete } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string
  ): Promise<Jogador[]> {

    if (email) {
      return await this.jogadoresService.consultarJogadorPeloEmail(email)
    } else {
      return await this.jogadoresService.consultarTodosJogadores()
    }

  }

  @Delete()
  async deletarJogador(@Body() jogador: Jogador ): Promise<void> {
    const { email } = jogador
    return await this.jogadoresService.deletarJogador(email)
  }
}
