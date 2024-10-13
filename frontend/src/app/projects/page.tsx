import { ProjectTable } from '@/components/Projects/table';

const Home = (): JSX.Element => {
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      imageUrl: 'https://picsum.photos/300/300', // Fetching dummy image from Picsum
      currentSprint: 'Sprint 1',
      sprintProgress: 60,
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Mobile App Launch',
      imageUrl: 'https://picsum.photos/300/300', // Fetching dummy image from Picsum
      currentSprint: 'Sprint 2',
      sprintProgress: 100,
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      imageUrl: 'https://picsum.photos/300/300', // Fetching dummy image from Picsum
      currentSprint: 'Sprint 1',
      sprintProgress: 0,
      status: 'Not Started',
    },
    {
      id: 4,
      name: 'New Feature Development',
      imageUrl: 'https://picsum.photos/300/300', // Fetching dummy image from Picsum
      currentSprint: 'Sprint 3',
      sprintProgress: 40,
      status: 'In Progress',
    },
    {
      id: 5,
      name: 'Product Update',
      imageUrl: 'https://picsum.photos/300/300', // Fetching dummy image from Picsum
      currentSprint: 'Sprint 1',
      sprintProgress: 10,
      status: 'On Hold',
    },
  ];

  return <ProjectTable projects={projects} />;
};

export default Home;
