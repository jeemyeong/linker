package linker.link

import linker.category.Category
import linker.category.CategoryDto
import linker.category.CategoryRepository
import linker.user.User
import linker.user.UserDto
import linker.user.UserRepository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 02/05/2018
 * Time: 1:18 AM
 */
@Repository
interface LinkRepository : JpaRepository<Link, Long> {
    fun findByCategory(category: Category): List<Link>
    @Query(value = "select * from links l left join categories c on l.category_id = c.id WHERE c.user_id = ?1", nativeQuery = true)
    fun findAllLinksByUser(user: User): List<Link>
}

@CrossOrigin
@RestController
@RequestMapping("/links")
class LinkController(val linkService: LinkService) {


    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long) = linkService.findById(id)

    @GetMapping("/all")
    fun all() = linkService.findAll()

    @PostMapping("/")
    fun new(@RequestBody createLinkCommand: CreateLinkCommand) =
            linkService.newLink(createLinkCommand)

    @PostMapping("/reorder/{id}")
    fun reorder(@PathVariable id: Long, @RequestBody reorderLinkDto: ReorderLinkDto) = linkService.reorderLink(id, reorderLinkDto)

}

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
        return UserWithLinksDto(user = user.toDto(), links = linkRepository.findAllLinksByUser(user).map { it.toDto() }.sortedBy { it.order })
    }

    fun newLink(createLinkCommand: CreateLinkCommand): Link {
        val categoryId = createLinkCommand.categoryId
        val category = categoryRepository.findById(categoryId).orElseThrow { throw IllegalArgumentException("Cannot find by categoryId: $categoryId") }
        val order = linkRepository.findByCategory(category).size
        return linkRepository.save(Link.fromDto(createLinkCommand, category.toDto(), order))
    }

    fun reorderLink(linkId: Long, reorderLinkDto: ReorderLinkDto): List<Link> {
        val originLink = linkRepository.findById(linkId).orElseThrow { throw IllegalArgumentException("Cannot find by linkId: $linkId") }

        val originCategory = originLink.category
        val newCategoryId = reorderLinkDto.newCategoryId
        val newCategory = categoryRepository.findById(newCategoryId).orElseThrow { throw IllegalArgumentException("Cannot find by categoryIdLinkToGo: $newCategoryId") }
        val originOrder = originLink.order
        val newOrder = reorderLinkDto.newOrder

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

@Entity
@Table(name = "links")
data class Link(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        val url: String,
        @field:Column(nullable = false)
        val content: String,
        @field:ManyToOne(targetEntity = Category::class, fetch = FetchType.LAZY)
        @field:JoinColumn(name = "category_id")
        var category: Category,
        @field:Column(name = "`order`")
        var order: Int

) {
    fun toDto(): LinkDto = LinkDto(
            id = this.id,
            url = this.url,
            content = this.content,
            category = this.category.toDto(),
            order = this.order
    )

    companion object {
        fun fromDto(dto: LinkDto) = Link(
                id = dto.id,
                url = dto.url,
                content = dto.content,
                category = Category.fromDto(dto.category),
                order = dto.order
        )

        fun fromDto(command: CreateLinkCommand, categoryDto: CategoryDto, order: Int) = Link(
                url = command.url,
                content = command.content,
                category = Category.fromDto(categoryDto),
                order = order
        )
    }
}

data class LinkDto(
        var id: Long,
        var url: String,
        var content: String,
        var category: CategoryDto,
        var order: Int
)

data class CreateLinkCommand(
        val url: String,
        val content: String,
        val categoryId: Long,
        val email: String
)
data class UserWithLinksDto(
        val user: UserDto,
        val links: List<LinkDto>
)
data class ReorderLinkDto(
        val newCategoryId: Long,
        val newOrder: Int
)