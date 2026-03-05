import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  const user = await prisma.user.upsert({
    where: { email: 'admin@politicsaround.com' },
    update: {},
    create: {
      email: 'admin@politicsaround.com',
      name: 'Admin User',
      password: 'hashedpassword', // In production use bcrypt
      role: 'ADMIN',
    },
  })

  const city = await prisma.city.create({
    data: {
      name: 'Islamabad',
      population: 1200000,
      province: 'ICT',
    },
  })

  const constituency = await prisma.constituency.create({
    data: {
      name: 'NA-46',
      number: 46,
      cityId: city.id,
    },
  })

  const party = await prisma.politicalParty.create({
    data: {
      name: 'Pakistan Tehreek-e-Insaf',
      abbreviation: 'PTI',
      logoUrl: 'https://example.com/pti.png',
    },
  })

  const candidate = await prisma.candidate.create({
    data: {
      name: 'Imran Khan',
      biography: 'Former Prime Minister of Pakistan.',
      careerStartYear: 1996,
      previousPositions: 'Prime Minister (2018-2022)',
      partyId: party.id,
      constituencyId: constituency.id,
    },
  })

  const election = await prisma.election.create({
    data: {
      year: 2018,
      type: 'General Election',
      totalVotes: 100000,
      constituencyId: constituency.id,
    },
  })

  await prisma.vote.create({
    data: {
      voteCount: 65000,
      candidateId: candidate.id,
      electionId: election.id,
    },
  })

  const survey = await prisma.survey.create({
    data: {
      question: 'Who should be the next PM?',
      cityId: city.id,
    },
  })

  await prisma.surveyResponse.create({
    data: {
      surveyId: survey.id,
      userId: user.id,
      rating: 5,
      comment: 'Best leader!',
    },
  })

  const review = await prisma.review.create({
    data: {
      candidateId: candidate.id,
      userId: user.id,
      content: 'He fulfilled many promises.',
      rating: 5,
      sentimentScore: 0.9,
    },
  })

  await prisma.project.create({
    data: {
      candidateId: candidate.id,
      title: 'Health Card',
      description: 'Universal health insurance for all citizens.',
      status: 'Completed',
      completionYear: 2021,
    },
  })

  await prisma.promise.create({
    data: {
      candidateId: candidate.id,
      promise: '10 million jobs',
      fulfillmentStatus: 'In Progress',
    },
  })

  await prisma.news.create({
    data: {
      title: 'Election 2024 Updates',
      content: 'Political landscape is changing rapidly in the capital.',
      source: 'Politics Around News',
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
