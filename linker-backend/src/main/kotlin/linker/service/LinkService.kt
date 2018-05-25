package linker.service

import linker.dto.CreateLinkCommand
import linker.dto.ReorderLinkCommand
import linker.entity.Link
import linker.helper.PageParser
import linker.pojo.PageHeaderInfo
import linker.repository.LinkRepository
import org.hibernate.validator.constraints.URL
import org.springframework.beans.factory.annotation.Autowired
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
class LinkService {
    @Autowired
    lateinit var userService: UserService
    @Autowired
    lateinit var categoryService: CategoryService
    @Autowired
    lateinit var pageParser: PageParser
    @Autowired
    lateinit var linkRepository: LinkRepository

    fun findById(id: Long): Link =
            linkRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by linkId: $id") }

    fun findAll(): List<Link> = linkRepository.findAll().sortedBy { it.order }

    fun findAllLinkByUser(email: String): List<Link> {
        val user = userService.findByEmail(email)
        return linkRepository.findAllLinksByUser(user)
    }

    @Transactional
    fun newLink(createLinkCommand: CreateLinkCommand): Link {
        val category = categoryService.findById(createLinkCommand.categoryId)
        val order = linkRepository.findByCategory(category).size + 1
        val pageHeaderInfo = pageParser.parsePageHeaderInfo(createLinkCommand.url)
        val user = userService.findByEmail(createLinkCommand.email)
        return linkRepository.save(createLinkCommand.toDomain(category = category, order = order, pageHeaderInfo = pageHeaderInfo, user = user))
    }

    @Transactional
    fun reorderLink(reorderLinkCommand: ReorderLinkCommand): List<Link> {
        reorderLinkCommand.links.forEach {
            val category = categoryService.findById(it.categoryId)
            val link = this.findById(it.id)
            link.category = category
            link.order = it.order
            linkRepository.save(link)
        }

        return findAll()
    }

    fun findByCategoryId(id: Long): List<Link> = linkRepository.findByCategoryId(id)

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
