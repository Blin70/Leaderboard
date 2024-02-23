import './app.css';
import Table from './Components/Table';

function App(){
    return(
        <div className="flex justify-center items-center w-full h-screen">
            <div style={{maxHeight:"802px"}} className='block h-full w-full justify-center items-center overflow-auto'>
                <Table/>
            </div>
        </div>
    );
};

export default App;