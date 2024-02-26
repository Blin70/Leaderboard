import './app.css';
import Table from './Components/Table';

function App(){
    return(
            <div style={{maxHeight:"802px"}} className='flex h-full w-full justify-center items-center overflow-auto'>
                <Table/>
            </div>
    );
};

export default App;