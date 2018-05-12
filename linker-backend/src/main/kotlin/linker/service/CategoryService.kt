package linker.service

import linker.dto.*
import linker.entity.Category
import linker.repository.CategoryRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */

@Service
class CategoryService(
        val categoryRepository: CategoryRepository,
        val userService: UserService
) {
    fun findById(id: Long): Category =
            categoryRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by categoryId: $id") }

    fun findAll(): List<Category> = categoryRepository.findAll().sortedBy { it.order }

    fun newColumn(createCategoryCommand: CreateCategoryCommand): Category {
        val user = userService.findByEmail(createCategoryCommand.email)
        val order = categoryRepository.findAll().size + 1
        return categoryRepository.save(createCategoryCommand.toDomain(userDto = UserDto.fromDomain(user), order = order))
    }

    @Transactional
    fun reorderColumn(categories: List<CategoryDto>): List<Category> {
        categories.forEach {
            val order = it.order
            val category = findById(it.id)
            category.order = order
            categoryRepository.save(category)
        }

        return findAll()
    }
}