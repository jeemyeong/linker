package linker.service

import linker.dto.CreateLinkCommand
import linker.dto.UserWithLinksDto
import linker.dto.toDomain
import linker.entity.Link
import linker.dto.LinkDto
import linker.dto.ReorderLinkCommand
import linker.dto.fromDomain
import linker.repository.CategoryRepository
import linker.repository.LinkRepository
import linker.dto.UserDto
import linker.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:41 PM
 */
@Transactional
@Service
class LinkService(
        val linkRepository: LinkRepository,
        val categoryRepository: CategoryRepository,
        val userRepository: UserRepository
) {
    fun findById(id: Long) = linkRepository.findById(id)

    fun findAll(): List<Link> = linkRepository.findAll().sortedBy { it.order }

    fun findAllLinkByUser(email: String): UserWithLinksDto {
        val user = userRepository.findByEmail(email = email).firstOrNull()
                ?: throw IllegalArgumentException("Cannot find by email: $email")
        return UserWithLinksDto(user = UserDto.fromDomain(user), links = linkRepository.findAllLinksByUser(user).map { LinkDto.fromDomain(it) }.sortedBy { it.order })
    }

    fun newLink(createLinkCommand: CreateLinkCommand): Link {
        val categoryId = createLinkCommand.categoryId
        val category = categoryRepository.findById(categoryId).orElseThrow { throw IllegalArgumentException("Cannot find by categoryId: $categoryId") }
        val order = linkRepository.findByCategory(category).size
        return linkRepository.save(createLinkCommand.toDomain(category, order))
    }

    fun reorderLink(linkId: Long, reorderLinkCommand: ReorderLinkCommand): List<Link> {
        val originLink = linkRepository.findById(linkId).orElseThrow { throw IllegalArgumentException("Cannot find by linkId: $linkId") }

        val originCategory = originLink.category
        val newCategoryId = reorderLinkCommand.newCategoryId
        val newCategory = categoryRepository.findById(newCategoryId).orElseThrow { throw IllegalArgumentException("Cannot find by categoryIdLinkToGo: $newCategoryId") }
        val originOrder = originLink.order
        val newOrder = reorderLinkCommand.newOrder

        // If link moves to same category
        if (newCategory.id == originLink.category.id) {
            if (originOrder < newOrder) {
                linkRepository.findByCategory(originCategory).filter { it.order in (originOrder + 1)..(newOrder) }.map { it.order = it.order-1; it }.forEach{ linkRepository.save(it) }
            } else {
                linkRepository.findByCategory(originCategory).filter { it.order in (newOrder)..(originOrder - 1) }.map { it.order = it.order+1; it }.forEach{ linkRepository.save(it) }
            }
            originLink.order = newOrder
            linkRepository.save(originLink)
            return findAll()
        }

        // If link moves to another category
        linkRepository.findByCategory(originCategory).filter { it.order > originOrder }.map { it.order = it.order-1; it }.forEach{ linkRepository.save(it) }
        linkRepository.findByCategory(newCategory).filter { it.order >= newOrder }.map { it.order = it.order+1; it }.forEach{ linkRepository.save(it) }

        originLink.category = newCategory
        originLink.order = newOrder
        linkRepository.save(originLink)
        return findAll()
    }
}
