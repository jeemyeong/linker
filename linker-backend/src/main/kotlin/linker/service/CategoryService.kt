package linker.service

import linker.dto.*
import linker.entity.Category
import linker.repository.CategoryRepository
import linker.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */

@Service
class CategoryService(val categoryRepository: CategoryRepository, val userRepository: UserRepository) {
    fun findById(id: Long) = categoryRepository.findById(id)

    fun findAll(): List<Category> = categoryRepository.findAll().sortedBy { it.order }

    fun newColumn(createCategoryCommand: CreateCategoryCommand): Category {
        val email = createCategoryCommand.email
        val user = Optional.ofNullable(userRepository.findByEmail(email).firstOrNull()).orElseThrow { throw IllegalArgumentException("Cannot find by email: $email") }
        val order = categoryRepository.findAll().size + 1
        return categoryRepository.save(createCategoryCommand.toDomain(userDto = UserDto.fromDomain(user), order = order))
    }

    fun reorderColumn(categoryId: Long, reorderCategoryCommand: ReorderCategoryCommand): List<Category> {
        val originLinkColumn = categoryRepository.findById(categoryId).orElseThrow { throw IllegalArgumentException("Cannot find by categoryId: $categoryId") }
        val newOrder = reorderCategoryCommand.newOrder
        val originOrder = originLinkColumn.order
        if (originOrder < newOrder) {
            categoryRepository.findAll().filter { it.order in (originOrder + 1)..(newOrder) }.map { it.order = it.order-1; it }.forEach{ categoryRepository.save(it) }
        } else {
            categoryRepository.findAll().filter { it.order in (newOrder)..(originOrder - 1) }.map { it.order = it.order+1; it }.forEach{ categoryRepository.save(it) }
        }
        originLinkColumn.order = newOrder
        categoryRepository.save(originLinkColumn)
        return findAll()
    }
}