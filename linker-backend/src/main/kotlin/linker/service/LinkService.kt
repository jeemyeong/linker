package linker.service

import linker.dto.CreateLinkCommand
import linker.dto.LinkDto
import linker.dto.fromDomain
import linker.dto.toDomain
import linker.entity.Link
import linker.helper.PageParser
import linker.pojo.PageHeaderInfo
import linker.repository.LinkRepository
import org.hibernate.validator.constraints.URL
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
        val categoryService: CategoryService,
        val pageParser: PageParser

) {
    fun findById(id: Long): Link =
            linkRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by linkId: $id") }

    fun findAll(): List<Link> = linkRepository.findAll().sortedBy { it.order }

    fun findAllLinkByUser(email: String): List<Link> {
        val user = userService.findByEmail(email)
        return linkRepository.findAllLinksByUser(user)
    }

    @Transactional
    fun newLink(createLinkCommand: CreateLinkCommand): Link {
        val category = categoryService.findById(createLinkCommand.link.category.id)
        val order = linkRepository.findByCategory(category).size + 1
        val pageHeaderInfo = pageParser.parsePageHeaderInfo(createLinkCommand.link.url)
        return linkRepository.save(createLinkCommand.toDomain(order, pageHeaderInfo))
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

    @Transactional
    fun deleteLink(linkId: Long): Link {
        val link = findById(linkId)
        linkRepository.deleteById(linkId)
        val links = this.linkRepository.findByCategory(link.category)
        links.filter { it.order > link.order }.forEach { it.order -= 1; linkRepository.save(it) }
        return link
    }

    fun testCrawler(
            @URL url: String
    ): PageHeaderInfo {
        return pageParser.parsePageHeaderInfo(url = url)
    }
}
