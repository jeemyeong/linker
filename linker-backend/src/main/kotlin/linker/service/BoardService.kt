package linker.service

import linker.dto.BoardDto
import linker.dto.CategoryDto
import linker.dto.LinkDto
import linker.dto.UpdateBoardCommand
import linker.entity.Board
import linker.entity.Category
import linker.repository.BoardRepository
import linker.repository.CategoryRepository
import linker.repository.LinkRepository
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
    lateinit var categoryRepository: CategoryRepository
    @Autowired
    lateinit var linkRepository: LinkRepository
    @Autowired
    lateinit var userService: UserService

    fun findBoardById(id: Long): Board {
        return boardRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by boardId: $id") }
    }

    @Transactional
    fun getBoard(id: Long): BoardDto =
        findBoardById(id = id).let { board->
            BoardDto.fromDomain(board = board, categories = board.categories.map { category ->
                CategoryDto.fromDomain(category = category, links = category.links.map { link ->
                    LinkDto.fromDomain(link = link) }.sortedBy { it.order }) }.sortedBy { it.order })
        }

    @Transactional
    fun updateBoard(id: Long, updateBoardCommand: UpdateBoardCommand): BoardDto {
        val user = userService.findByEmail(updateBoardCommand.email)
        val categories = categoryService.findAll().map { category -> category.id }
        categories.subtract(updateBoardCommand.categories.map { categoryDto -> categoryDto.id }).forEach{id ->
            categoryRepository.deleteById(id)
        }
        val board = this.findBoardById(id)
        updateBoardCommand.categories.forEachIndexed { index, categoryDto ->
            val category = categoryRepository.findById(categoryDto.id).orElse(Category(0, "", 0, board, emptyList()))
            val links = categoryDto.links?.mapIndexed { linkIndex, linkDto ->
                val link = linkDto.toDomain(category = category, user = user)
                link.order = linkIndex+1
                linkRepository.save(link)
                link
            } ?: emptyList()
            category.links = links
            category.title = categoryDto.title
            category.id = categoryDto.id
            category.order = index+1
            categoryRepository.save(category)
        }
        return this.getBoard(id)
    }
}