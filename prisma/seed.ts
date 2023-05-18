import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let types = await prisma.ticketType.findMany();
  if (types.length === 0) {
    await prisma.ticketType.createMany({
     data: [
        { name: 'online', price: 100, isRemote: true, includesHotel: false },
        { name: 'presencial sem hotel', price: 250, isRemote: false, includesHotel: false },
        { name: 'presencial com hotel', price: 600, isRemote: false, includesHotel: true },
      ],
    })
  }

  let hotels = await prisma.hotel.findMany();
  if (hotels.length === 0) {
    await prisma.hotel.createMany({
     data: [
        { name: 'Driven Resort', image: 'https://blog.hotelpontaverde.com.br/wp-content/uploads/2019/09/Resort-ou-Hotel-Hotel-Ponta-Verde-France%CC%82s.png' },
        { name: 'Driven Palace', image: 'https://www.oetkercollection.com/media/42386/meu-projeto-2.jpg?anchor=center&mode=crop&quality=85&width=1000&height=500&rnd=133154133310000000' },
        { name: 'Driven World', image: 'https://pix8.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768' },
      ],
    })
  }

  let rooms = await prisma.room.findMany();
  if (rooms.length === 0) {
    await prisma.room.createMany({
     data: [
        { name: '100', capacity: 1, hotelId: 1 },
        { name: '101', capacity: 2, hotelId: 1 },
        { name: '102', capacity: 1, hotelId: 1 },
        { name: '103', capacity: 3, hotelId: 1 },
        { name: '200', capacity: 1, hotelId: 2 },
        { name: '201', capacity: 1, hotelId: 2 },
        { name: '202', capacity: 1, hotelId: 2 },
        { name: '203', capacity: 2, hotelId: 2 },
        { name: '204', capacity: 2, hotelId: 2 },
        { name: '205', capacity: 2, hotelId: 2 },
        { name: '300', capacity: 1, hotelId: 3 },
        { name: '301', capacity: 1, hotelId: 3 },
        { name: '302', capacity: 1, hotelId: 3 },
        { name: '303', capacity: 1, hotelId: 3 },
        { name: '304', capacity: 1, hotelId: 3 },
        { name: '305', capacity: 1, hotelId: 3 },
        { name: '306', capacity: 1, hotelId: 3 },
        { name: '307', capacity: 1, hotelId: 3 },
      ],
    })
  }

  console.log(event, types, hotels, rooms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
