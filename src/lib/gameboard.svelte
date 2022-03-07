<script>
  import bestMove from "../scripts/AI_logic" 
  let list= ["", "", "", "", "", "", "", "", ""];
  let humanWin= false;
  let botWin= false;
  let draw= false;


  function addX(id) {
			if (humanWin || botWin) {
				return;
			}
			// @ts-ignore
			if (!list[id] == "") {
				return;
			}
			if (list[id] == "") {
				list[id] = "X";
			}

			computerAnswer();
			updateWinState();
      
		}

    function reset() {
			list = ["", "", "", "", "", "", "", "", ""];
			humanWin = false;
			botWin = false;
			draw = false;
		}

    // function addValue() {
		// 	console.log("addValue is accessed ");
		// 	MakeMove(message, list);
		// }

    function computerAnswer() {
			let output = 0;
			output = bestMove(list);
			MakeMove(output, list);
			updateWinState();
			console.log("The best move to make is:" + output);
		}

    function updateWinState() {
			// TODO: add to all required places
			humanWin = checkWin("X", list);
			botWin = checkWin("O", list);
			if (!list.includes("") && !botWin && !humanWin) {
				draw = true;
			}
		}

    
function MakeMove(num, list) {
	let humanWin = false;
	let botWin = false;

	if (list[num] == "") {
		humanWin = checkWin("X", list);
		botWin = checkWin("O", list);
		if (humanWin) {
			return {
				HasPlayerWon: humanWin,
				HasBotWon: botWin,
			};
		}
		list[num] = "O"; // assignment
	}

	// final check
	humanWin = checkWin("X", list);
	botWin = checkWin("O", list);

	return {
		HasPlayerWon: humanWin,
		HasBotWon: botWin,
	};
}

function checkWin(WinChar, list) {
	function checkLine(x, y, z) {
		return list[x] == WinChar && list[y] == WinChar && list[z] == WinChar;
	}

	return (
		checkLine(0, 3, 6) ||
		checkLine(1, 4, 7) ||
		checkLine(2, 5, 8) ||
		checkLine(0, 1, 2) ||
		checkLine(3, 4, 5) ||
		checkLine(6, 7, 8) ||
		checkLine(0, 4, 8) ||
		checkLine(2, 4, 6)
	);
}

</script>

<body>
  <div class="container-fluid">
    <h1 class="animate__animated animate__bounce">Tic Tac Toe</h1>
    <div class="game-board my-5">
      <table>
        <transition-group
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOutRight"
          tag="tr"
        >
          <tr>
            <td id="0" on:click={()=> addX(0)}>{list[0]}</td>
            <td id="1" class="vert" on:click={()=> addX(1)}>{list[1]}</td>
            <td id="2" on:click={()=> addX(2)}>{list[2]}</td>
          </tr>
          <tr>
            <td id="3" class="hori" on:click={()=> addX(3)}>{list[3]}</td>
            <td id="4" class="vert hori" on:click={()=> addX(4)}>{list[4]}</td>
            <td id="5" class="hori" on:click={()=> addX(5)}>{list[5]}</td>
          </tr>
          <tr>
            <td id="6" on:click={()=> addX(6)}>{list[6]}</td>
            <td id="7" class="vert" on:click={()=> addX(7)}>{list[7]}</td>
            <td id="8" on:click={()=> addX(8)}>{list[8]}</td>
          </tr>
        </transition-group>
      </table>
    </div>
    <div
      class="winner-stage animate__animated animate__slideInLeft"
      v-if="humanWin || botWin || draw"
    >
      <div v-if="humanWin" class="Win-stage">You Win!!!</div>
      <div v-if="botWin" class="Win-stage">Computer Wins!!!</div>
      <div v-if="draw" class="Win-stage">Draw , Better Luck next time</div>
      <div class="mx-auto my-4" style="width: 120px">
        <button type="button" class="btn btn-success mx-auto">
          Play Again 🤞
        </button>
      </div>
    </div>
  </div>
</body>

<style type="text/scss">
  @import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

  h1 {
    text-align: center;
  }
  td {
    width: 100px;
    height: 100px;
  }
  table {
    margin: 5px auto;

    td {
      font-size: 60px;
      text-align: center;
      font-family: "Varela Round", sans-serif;
    }
  }
  .vert {
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
  .hori {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  .winner-stage {
    margin: 5em auto;
    .Win-stage {
      font-size: 50px;
      text-align: center;
      font-family: "Varela Round", sans-serif;
    }
  }
</style>
