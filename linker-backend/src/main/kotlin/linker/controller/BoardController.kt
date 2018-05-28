//package linker.controller
//
//import linker.dto.BoardResponse
//import linker.dto.UpdateBoardCommand
//import linker.service.BoardService
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.web.bind.annotation.*
//
///**
// * Created by Jeemyeong.
// * User: jeemyeonglee
// * Date: 25/05/2018
// * Time: 9:23 PM
// */
//@CrossOrigin
//@RestController
//@RequestMapping("/board")
//class BoardController {
//    @Autowired
//    lateinit var boardService: BoardService
//
//    @GetMapping("/{id}")
//    fun getBoard(@PathVariable id: Long): BoardResponse =
//            boardService.getBoard(id)
//                    .let { board -> BoardResponse(board = board) }
//
//    @PutMapping("/{id}")
//    fun reorder(@PathVariable id: Long, @RequestBody updateBoardCommand: UpdateBoardCommand): BoardResponse =
//            boardService.updateBoard(id = id, updateBoardCommand = updateBoardCommand)
//                    .let { board -> BoardResponse(board = board) }
//}