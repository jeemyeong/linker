package linker.service

import linker.dto.CreateCategoryCommand
import linker.dto.ReorderCategoryCommand
import linker.entity.Category
import linker.repository.CategoryRepository
import linker.dto.UserDto
import linker.repository.UserRepository
import linker.dto.fromDomain
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
        return categoryRepository.save(createCategoryCommand.toDomain(userDto = UserDto.fromDomain(user)))
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