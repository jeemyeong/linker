package linker.service

import linker.dto.*
import linker.entity.Link
import linker.repository.LinkRepository
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
        val userService: UserService,
        val categoryService: CategoryService
) {
    fun findById(id: Long): Link =
            linkRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by linkId: $id") }

    fun findAll(): List<Link> = linkRepository.findAll().sortedBy { it.order }

    fun findAllLinkByUser(email: String): UserWithLinksDto {
        val user = userService.findByEmail(email)
        return UserWithLinksDto(user = UserDto.fromDomain(user), links = linkRepository.findAllLinksByUser(user).map { LinkDto.fromDomain(it) }.sortedBy { it.order })
    }

    fun newLink(createLinkCommand: CreateLinkCommand): Link {
        val categoryId = createLinkCommand.categoryId
        val category = categoryService.findById(categoryId)
        val order = linkRepository.findByCategory(category).size + 1
        return linkRepository.save(createLinkCommand.toDomain(category, order))
    }

    @Transactional
    fun reorderLink(links: List<LinkDto>): List<Link> {
        links.forEach {
            val category = categoryService.findById(it.category.id)
            val link = this.findById(it.id)
            link.category = category
            link.order = it.order
            linkRepository.save(link)
        }

        return findAll()
    }
}
