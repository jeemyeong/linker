package linker.ui.board

import linker.app.board.BoardCommand
import linker.app.board.BoardService
import linker.app.board.BoardVO
import linker.infra.annotation.Authenticated
import linker.infra.exceptions.TokenException
import linker.infra.helper.SignHelper
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

@CrossOrigin(origins = ["http://localhost:3000"], allowCredentials = "true")
@RestController
@RequestMapping(value = ["/board"])
@Controller
class BoardController {
    @Autowired
    lateinit var boardService: BoardService
    @Autowired
    lateinit var signHelper: SignHelper
    /**
     * Command
     */
    @Authenticated
    @RequestMapping(value = ["/{boardId}"], method = [(RequestMethod.PUT)])
    fun updateBoard(@PathVariable boardId: Long, @RequestBody board: BoardVO): ResponseEntity<Any> {
        return boardService.findBoardById(boardId).map {
            if (it.userId != signHelper.getUserId()) {
                throw TokenException("You cannot command this board")
            }
            ResponseEntity<Any>(BoardDto.fromDomain(boardService.updateBoard(it.userId, BoardCommand.UpdateBoard(
                    id = boardId,
                    board = board
            ))), HttpStatus.OK)
        }.orElse(ResponseEntity("Board is not present", HttpStatus.BAD_REQUEST))
    }

    @Authenticated
    @RequestMapping(method = [(RequestMethod.POST)])
    fun createBoard(@RequestBody createBoardCommand: BoardCommand.CreateBoard): ResponseEntity<Any> {
        return ResponseEntity(boardService.newBoard(signHelper.getUserId(), createBoardCommand.title), HttpStatus.OK)
    }

    @Authenticated
    @RequestMapping(value = ["/{boardId}"], method = [(RequestMethod.DELETE)])
    fun deleteBoard(@PathVariable boardId: Long): ResponseEntity<Any> {
        return boardService.findBoardById(boardId).map {
            if (it.userId != signHelper.getUserId()) {
                throw TokenException("You cannot command this board")
            }
            ResponseEntity<Any>(boardService.deleteBoard(boardId), HttpStatus.OK)
        }.orElse(ResponseEntity("Board is not present", HttpStatus.BAD_REQUEST))
    }

    @Authenticated
    @RequestMapping(value = ["/{boardId}/title"], method = [(RequestMethod.PUT)])
    fun updateBoardTitle(@PathVariable boardId: Long, @RequestBody updateBoardTitleCommand: BoardCommand.UpdateBoardTitle): ResponseEntity<Any> {
        return boardService.findBoardById(boardId).map {
            if (it.userId != signHelper.getUserId()) {
                throw TokenException("You cannot command this board")
            }
            ResponseEntity<Any>(boardService.updateBoard(boardId, updateBoardTitleCommand.title), HttpStatus.OK)
        }.orElse(ResponseEntity("Board is not present", HttpStatus.BAD_REQUEST))
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

    @RequestMapping(value = ["/user/{userId}"], method = [(RequestMethod.GET)])
    fun getBoards(@PathVariable userId: Long): ResponseEntity<Any> {
        return ResponseEntity<Any>(boardService.findByUserId(userId), HttpStatus.OK)
    }
}
