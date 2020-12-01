import instance from './instance';

const getDefinitions = async () => {
  try {
    const response = await instance.get('/definitions');
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getDefinitionsFromSubject = async (name) => {
  try {
    const response = await instance.get(`/definitions/subject/${name}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const postDefinition = async (body) => {
  try {
    const response = await instance.post('/definitions', body);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { postDefinition, getDefinitionsFromSubject };
export default getDefinitions;