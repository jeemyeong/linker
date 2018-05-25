package linker.service

import linker.dto.BoardDto
import linker.dto.CategoryDto
import linker.dto.LinkDto
import linker.entity.Board
import linker.repository.BoardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:27 PM
 */
@Service
class BoardService {
    @Autowired
    lateinit var boardRepository: BoardRepository
    @Autowired
    lateinit var categoryService: CategoryService
    @Autowired
    lateinit var linkService: LinkService

    fun findBoardById(id: Long): Board {
        return boardRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by boardId: $id") }
    }

    @Transactional
    fun getBoard(id: Long): BoardDto =
        findBoardById(id = id).let { board->
            BoardDto.fromDomain(board, board.categories.map { category ->
                CategoryDto.fromDomain(category, category.links.map { link ->
                    LinkDto.fromDomain(link) }) })
        }
}