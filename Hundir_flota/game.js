import { playerA, playerB, LANCHA, CRUCERO, SUBMARINO, BUQUE, PORTAAVIONES, FIGURES} from './data.js'
import * as board from './board.js'
import { gridSize, EMPTY, playerAGrid, playerBGrid } from './board.js'
import usePrinter from './printer.js'
const { printHeading, printLine, print_Grid } = usePrinter()

export default {
    rondas: 0,
    totalShoots: 0,
    setUpGame: {  // funciones de inicio del juego      
        createBoards() {
            board.create_Grid(size),
            board.create_Headers(size)
        },    
        
        // ✅ Crear barcos para los jugadores
        /*shipCoords (ship, x1, y1){
            let totalposition = []
            console.log (randomCoords)
           this.ship[ship].position.push(Object.assign([], randomCoords))
            for(let i = 0; i < (this.ship[ship].life-1); i++){
                    totalposition.push(randomCoords.map(e => e))
                    randomCoords[0] = ++x1
                    //Object.assign(this.ship[ship].position.push(randomCoords.map(e => e)))
                    (this.ship[ship].position.push(randomCoords.map(e => e)))
                }
            }
        };*/

        shipsToPlayers(player){
            player.ships = [
                {id: 'Portaaviones', PORTAAVIONES},
                {id: 'Buque', BUQUE},
                {id: 'Submarino1', SUBMARINO}, 
                {id: 'Submarino2', SUBMARINO},
                {id: 'Crucero1', CRUCERO}, 
                {id: 'Crucero2', CRUCERO},
                {id: 'Crucero3', CRUCERO},
                {id: 'Lancha1', LANCHA},
                {id: 'Lancha2', LANCHA},
                {id: 'Lancha3', LANCHA}
            ]
        },
        //Colocar los barcos de los jugadores
        
        freeSpaceH(playerGrid, barco, x1, y1) {
            
            let noEmpty = '';    
            for (let i = 0; i < barco.life; i++){
                if (playerGrid[y1][x1] == EMPTY){          
                    ++x1;
                    return false;
                } else {   
                    break
                }
            }  
        },
        freeSpaceV(playerGrid, barco, x1, y1) {
            
            let noEmpty = '';
            for (let i = 0; i < barco.life; i++){
                if (playerGrid[y1][x1] == EMPTY){          
                    ++y1;
                    return false;
                } else {
                    break
                }
            }   
        },

        placeH(player, barco, x1, y1, playerGrid){
            
            if (this.freeSpaceH(playerGrid, barco, x1, y1) == false) {    

                this.placeShipsH(barco, x1, y1, gridSize, playerGrid)
            }
            else {
                this.placeShips(player, barco, playerGrid)
                }
            },
            
            placeV(player, barco, x1, y1, playerGrid){
                
            if (this.freeSpaceV(playerGrid, barco, x1, y1) == false) {    
                
                this.placeShipsV(barco, x1, y1, gridSize, playerGrid)
                }
                else {
                this.placeShips(player, barco, playerGrid)
            }
        },

        placeShipsH(barco, x1, y1, gridSize, grid) {

            for (let i = 0; i < barco.life; i++){
                if (grid[y1][x1] == EMPTY && x1 < gridSize && x1 >= 0){
                    grid[y1][x1] = barco.figure;
                    ++x1;
                }
            }
        },
        
        placeShipsV(barco, x1, y1, gridSize, grid) {   
            
            for (let i = 0; i < barco.life; i++){
                if (grid[y1][x1] == EMPTY && y1 < gridSize && y1 >= 0){
                    grid[y1][x1] = barco.figure;
                    ++y1;
                }
            }
        },

        placeShips(player, barco, playerGrid){ //, playergrid){
            let a = random(0, gridSize)
            if (a % 2 == 0) {
                let x1 = random(0, gridSize - barco.life);      //Obtengo un número aleatorio para el espacio máximo en el que puede colocarse este barco.
                let y1 = Math.floor(Math.random() * gridSize);
                
                this.placeH(player, barco, x1, y1, playerGrid)
            }
            else{
                let y1 = random(0, gridSize - barco.life);                    
                let x1 = Math.floor(Math.random() * gridSize);

                this.placeV(player, barco, x1, y1, playerGrid)

            }
            
        },  
    },

    touchedAndSunk(barco){
        barco.life--
        if(barco.life == 0) {
            console.log(`The ship ${barco.id} has been sunk. Well done!!`)
        }
        else {
            //función next player
        }
    },
    
    toTestLife(shooter, enemy){
        if (enemy.life == 0){
            printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED')
            printHeading(`THE WINNER IS: ${shooter}`)
            this.dead = true
        }
    },
    
    toTestLog(shooter, enemy, shootCoords){
        const find = shooter.shootsLog.findIndex(elemento => elemento[0] === shootCoords[0] && elemento[1] === shootCoords[1]);
        if (find != -1){
            this.toShoot(shooter, enemy)
        }
        else {
            this.toLog(shooter, shootCoords)
            shooter.shoots++  // Aumento en 1 los disparos realizados por el jugador shooter
        }
    },

    toLog(shooter, shootCoords){    //Añadimos el disapro al registro de diparos de cada jugador
        
        shooter.shootsLog.push(Object.assign([], shootCoords))
    },
    
    toShoot(shooter, enemy){
        let x = random(0, gridSize-1);
        let y = random(0, gridSize-1);
        let shootCoords = [x, y]
        let figurin = '';
        shooter.shootCoord = shootCoords        //Asigno el disparo a la propiedad shootCoord del jugador que dipara
        this.toTestLog(shooter, enemy, shootCoords)    //Compruebo si se ha realizado el disparo
        
        if (enemy.grid[y][x] != EMPTY){
            enemy.grid[y][x] = FIGURES[1]
            enemy.life--
            figurin = '🔥'
        }
        else {
            enemy.grid[y][x] = FIGURES[0]
            figurin = '💧'
        }

        console.log(`Shoot #${shooter.shoots} pointing to ${shootCoords[1]}${String.fromCharCode(shootCoords[0] + 65)}: ${figurin}`)
        console.log(shooter.shootsLog)
        console.log(`Vida de ${shooter.name}: ${shooter.life}`)
        console.log(`Vida de ${enemy.name}: ${enemy.life}`)
        this.toTestLife(shooter, enemy)
    },
    start(){
        let dead = false;
        while (dead == false && this.totalShoots < 200){
        
                //Ciclo de rondas
                //JUGADOR A
                printLine(`Ronda ${playerA.shoots} for ${playerA.name}`)
                this.toShoot(playerA, playerB)    
                this.totalShoots++
                console.log(this.totalShoots)    //Borrar luego
                printLine('Own board')
                print_Grid(playerA.grid)
                
                console.log()
                printLine('Enemy board')
                print_Grid(playerB.grid, true)
                console.log()
                
                //JUGADOR B
                printLine(`Ronda  ${playerB.shoots} for ${playerB.name}`)
                this.toShoot(playerB, playerA)
                this.totalShoots++
                console.log(this.totalShoots)    //Borrar luego
                printLine('Own board')
                print_Grid(playerB.grid)
                
                console.log()
                printLine('Enemy board')
                print_Grid(playerA.grid, true)
                console.log()
            }
          /*  else  {
                printHeading('THE BATTTLESHIP SIMULATOR HAS ENDED')
                console.log()
                this.toWin()
                break
            }
        } */
    }, 

    /*toWin(){
        if(playerA.life > 0){
            printHeading(`THE WINNER IS: ${playerA.name}`)
        }  
        else {
            printHeading(`THE WINNER IS: ${playerB.name}`)
        }
    }*/
}
function random(min, max) {                     
    return Math.floor((Math.random() * (max - min + 1)) + min)
}