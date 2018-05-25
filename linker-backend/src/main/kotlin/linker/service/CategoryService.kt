package linker.service

import linker.dto.CategoryDto
import linker.dto.CreateCategoryCommand
import linker.dto.UpdateCategoryCommand
import linker.dto.toDomain
import linker.entity.Category
import linker.repository.CategoryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */

@Service
class CategoryService {
    @Autowired
    lateinit var categoryRepository: CategoryRepository
    @Autowired
    lateinit var userService: UserService
    @Autowired
    lateinit var boardService: BoardService

    fun findById(id: Long): Category =
            categoryRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by categoryId: $id") }

    fun findAll(): List<Category> = categoryRepository.findAll().sortedBy { it.order }

    fun newCategory(createCategoryCommand: CreateCategoryCommand): Category {
        val board = boardService.findBoardById(createCategoryCommand.boardId)
        val order = categoryRepository.findAll().size + 1
        return categoryRepository.save(createCategoryCommand.toDomain(board = board, order = order))
    }

    @Transactional
    fun reorderCategories(categories: List<CategoryDto>): List<Category> {
        categories.forEach {
            val order = it.order
            val category = findById(it.id)
            category.order = order
            categoryRepository.save(category)
        }

        return findAll()
    }

    @Transactional
    fun updateCategory(updateCategoryCommand: UpdateCategoryCommand): Category {
        val category = this.findById(updateCategoryCommand.id)
        category.title = updateCategoryCommand.title
        categoryRepository.save(category)
        return category
    }

    @Transactional
    fun findByBoardId(id: Long): Collection<Category> = categoryRepository.findByBoardId(id)
}