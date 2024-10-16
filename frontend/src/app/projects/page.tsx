import { ProjectCard } from '@/components/Project/Card';
import { ProjectTable } from '@/components/Projects/table';

const Home = (): JSX.Element => {
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'adsf',
      imageUrl:
        'https://utfs.io/f/v9TWYtJIg8cm7UXZCAgk25wihMWTCRpZKdb1fco0Bnyust6F',
      key: 'DG', // Fetching dummy image from Picsum
    },
    {
      id: 2,
      name: 'Mobile App Launch',
      description: 'adsf',
      imageUrl:
        'https://utfs.io/f/v9TWYtJIg8cm7UXZCAgk25wihMWTCRpZKdb1fco0Bnyust6F',
      key: 'DA', // Fetching dummy image from Picsum
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'adsf',
      imageUrl:
        'https://utfs.io/f/v9TWYtJIg8cm7UXZCAgk25wihMWTCRpZKdb1fco0Bnyust6F',
      key: 'DG', // Fetching dummy image from Picsum
    },
    {
      id: 4,
      name: 'New Feature Development',
      description: 'adsf',
      imageUrl:
        'https://utfs.io/f/v9TWYtJIg8cm7UXZCAgk25wihMWTCRpZKdb1fco0Bnyust6F', // Fetching dummy image from Picsum
      key: 'CLD',
    },
    {
      id: 5,
      name: 'Product Update',
      description: 'adsf',
      imageUrl:
        'https://utfs.io/f/v9TWYtJIg8cm7UXZCAgk25wihMWTCRpZKdb1fco0Bnyust6F',
      key: 'AD', // Fetching dummy image from Picsum
    },
  ];
  return <></>;

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
};

export default Home;
