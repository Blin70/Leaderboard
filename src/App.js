import './app.css';

function App(){
    return(
        <div className="flex justify-center items-center h-screen">
            <table className="w-1/2 h-1/2 border-2 border-solid border-black text-center text-2xl overflow-visible border-collapse">
                <thead className="border-4 border-solid border-black position-sticky">
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>RR</th>
                        <th>Wins</th>
                        <th>Games Played</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Test</td>
                        <td>130</td>
                        <td>13</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Test</td>
                        <td>130</td>
                        <td>13</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Test</td>
                        <td>130</td>
                        <td>13</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default App;