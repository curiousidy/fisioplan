import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { start } from 'repl';

export async function POST(request: Request) {

  try {
    await seedPhisios();
    await seedClients();
    
    const physios = await prisma.physio.findMany();
    const clients = await prisma.client.findMany();

    await seedQuotes(physios[0].id, clients[0].id);

   
    return NextResponse.json({
      message: 'seed executed',
    
    });
  } catch (error:any) {
    console.error('Error creating physio:', error);
    return NextResponse.json({
      message: 'Failed to execute seed',
      error: error.message,
    });
  }
}
async function seedPhisios() {
  await prisma.physio.deleteMany(); // delete * from physio
  const physio = await prisma.physio.createMany({
    data: [
      { name: 'Adri' },
      { name: 'Alex' }
    ],
  });
  return physio;
}
async function seedClients() {
  await prisma.client.deleteMany(); // delete * from physio
  const clients = await prisma.client.createMany({
    data: [
      { 
        name: 'Adre',
        phone: '787878787',
      },
      { 
        name: 'Adro',
        phone: '787878787',
      },
    ],
  });
  return clients;
}
async function seedQuotes(physio_id:string,client_id:string) {
  await prisma.quote.deleteMany(); // delete * from physio
  const quote = await prisma.quote.createMany({
    data: [
      { 
       client_id,
       physio_id,
       startDate: new Date(),
       endDate: new Date(),
       status: 'pending'
      },
     
    ],
  });
  return quote;
}

