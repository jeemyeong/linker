package linker.presentation.board

import linker.app.board.BoardService
import linker.app.user.UserService
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
    @Autowired
    lateinit var userService: UserService
    /**
     * Command
     */



    /**
     * Query
     */
    @RequestMapping(value = ["/{boardId}"], method = [(RequestMethod.GET)])
    fun getBoard(@PathVariable boardId: Long): ResponseEntity<Any> {
        return boardService.getBoard(boardId).map {board->
            val userId = board.userId
            var user = if (userId != null) userService.findUserById(userId).orElse(null) else null
            ResponseEntity(BoardDto.fromDomain(board, user), HttpStatus.OK) as ResponseEntity<Any>
        }.orElse(ResponseEntity("Board is not present", HttpStatus.BAD_REQUEST))
    }
}