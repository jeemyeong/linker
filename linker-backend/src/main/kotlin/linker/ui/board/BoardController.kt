package linker.ui.board

import linker.app.board.BoardService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 29/05/2018
 * Time: 12:46 AM
 */

@CrossOrigin
@RestController
@RequestMapping(value = ["/board"])
@Controller
class BoardController {
    @Autowired
    lateinit var boardService: BoardService
    /**
     * Command
     */
    fun updateBoard() {
        TODO("not implemented")
    }


    /**
     * Query
     */
    @RequestMapping(value = ["/{boardId}"], method = [(RequestMethod.GET)])
    fun getBoard(@PathVariable boardId: Long): ResponseEntity<Any> {
        return boardService.findBoardById(boardId).map { board->
            ResponseEntity<Any>(BoardDto.fromDomain(board), HttpStatus.OK)
        }.orElse(ResponseEntity("Board is not present", HttpStatus.BAD_REQUEST))
    }
}