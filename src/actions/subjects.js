import instance from './instance';

const getSubjects = async () => {
  try {
    const response = await instance.get('/subjects');
    return response;
  } catch (error) {
    console.error(error);
  }
}

const postSubject = async (body) => {
  try {
    const response = await instance.post('/subjects', body);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { postSubject };
export default getSubjects;