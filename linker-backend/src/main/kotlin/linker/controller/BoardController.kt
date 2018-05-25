package linker.controller

import linker.service.BoardService
import linker.service.CategoryService
import org.springframework.web.bind.annotation.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:23 PM
 */
@CrossOrigin
@RestController
@RequestMapping("/board")
class BoardController(
        val boardService: BoardService,
        val categoryService: CategoryService
) {
    @GetMapping("/{id}")
    fun getBoard(@PathVariable id: Long) = boardService.getBoard(id)
}