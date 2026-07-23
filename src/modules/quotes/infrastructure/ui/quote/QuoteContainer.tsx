import React from 'react'
import QuoteComponent from './QuoteComponent'
import { findAllUseCase } from '@/modules/client/application/findAll/FindAllUseCase'
import { prismaClientRepository } from '@/modules/client/infrastructure/PrismaClientRepository'


const QuoteContainer = async () => {
  const clients = await findAllUseCase(prismaClientRepository);
  return (
    <QuoteComponent clientList = {clients}/>
  )
}

export default QuoteContainer