import * as S from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { SetStateAction, useCallback, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repositories>([]);
  const [loading, setLoading] = useState(false);

  function handleInputChange(e: { target: { value: SetStateAction<string>; }; }) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    async function submit() {
      setLoading(true);

      try {
        const response = await api.get(`repos/${newRepo}`)
        const data = {
          name: response.data.full_name
        }

        setRepositories([...repositories, data]);
        setNewRepo('');
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepo, repositories]);

  const handleDelete = useCallback((repoName: string) => {
    const findRepo = repositories.filter(item => item.name !== repoName);
    setRepositories(findRepo);
  },[repositories]);

  return (
    <S.Container>
      <h1>
        <FaGithub size={25} />
        Main
      </h1>

      <S.Form onSubmit={handleSubmit}>
        <input type="text" placeholder='Add new repos' value={newRepo} onChange={handleInputChange} />
        <S.SubmitButton loading={loading}>
          {
            loading ? (
              <FaSpinner color='#FFF' size={14} />

            ) :
              (
                <FaPlus color='#FFF' size={14} />
              )
          }
        </S.SubmitButton>
      </S.Form>

      <S.List>
        {
          repositories.map((item) => (
            <li key={item.name}>
              <span>
                <S.RemoveButton onClick={() => handleDelete(item.name)}><FaTrash size={14}/></S.RemoveButton>
                {item.name}
              </span>
              <Link to="/"><FaBars size={20} /></Link>
            </li>
          ))
        }
      </S.List>
    </S.Container>
  )
}

type Repositories = Array<data>;
type data = {
  name: string
}

export default Main;
