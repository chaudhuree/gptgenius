'use client';

import { useMutation } from '@tanstack/react-query';
import { getExistingTour,generateTourResponse,createNewTour } from '@/utils/actions';
import toast from 'react-hot-toast';
import TourInfo from '@/components/TourInfo';

const NewTour = () => {
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        return newTour;
      }
      toast.error('No matching city found...');
      return null;
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    // console.log('destination', destination);
    mutate(destination);
    
  };
  if(isPending){
    return <span className='loading loading-lg'></span>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className=' mb-4'>Select your dream destination</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />
          <button className='btn btn-primary join-item' type='submit'>
            generate tour
          </button>
        </div>
      </form>
      <div className='mt-16'>
        <div className='mt-16'>{tour ? <TourInfo tour={tour} /> : null}</div>
      </div>
    </>
  );
};
export default NewTour;