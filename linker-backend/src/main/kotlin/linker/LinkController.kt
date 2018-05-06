package linker

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
    fun findByLinkColumn(linkColumn: LinkColumn): List<Link>
    @Query(value = "select * from links l left join link_columns c on l.link_column_id = c.id WHERE c.user_id = ?1", nativeQuery = true)
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
    fun new(@RequestBody createLinkDto: CreateLinkDto) =
            linkService.newLink(createLinkDto)

    @PostMapping("/reorder/{id}")
    fun reorder(@PathVariable id: Long, @RequestBody reorderLinkDto: ReorderLinkDto) = linkService.reorderLink(id, reorderLinkDto)

}

@Transactional
@Service
class LinkService(
        val linkRepository: LinkRepository,
        val linkColumnRepository: LinkColumnRepository,
        val userRepository: UserRepository
) {
    fun findById(id: Long) = linkRepository.findById(id)

    fun findAll(): List<Link> = linkRepository.findAll().sortedBy { it.order }

    fun findAllLinkByUser(email: String): UserWithLinksDto {
        val user = userRepository.findByEmail(email = email).firstOrNull()
                ?: throw IllegalArgumentException("Cannot find by columnId: $email")
        return UserWithLinksDto(user = user.toDto(), links = linkRepository.findAllLinksByUser(user).map { it.toDto() }.sortedBy { it.order })
    }

    fun newLink(createLinkDto: CreateLinkDto): Link {
        val linkColumnId = createLinkDto.linkColumnId
        val linkColumn = linkColumnRepository.findById(linkColumnId).orElseThrow { throw IllegalArgumentException("Cannot find by columnId: $linkColumnId") }
        val order = linkRepository.findByLinkColumn(linkColumn).size
        return linkRepository.save(Link.fromDto(createLinkDto, linkColumn.toDto(), order))
    }

    fun reorderLink(linkId: Long, reorderLinkDto: ReorderLinkDto): List<Link> {
        val originLink = linkRepository.findById(linkId).orElseThrow { throw IllegalArgumentException("Cannot find by linkId: $linkId") }

        val originColumn = originLink.linkColumn
        val newColumnId = reorderLinkDto.newColumnId
        val newColumn = linkColumnRepository.findById(newColumnId).orElseThrow { throw IllegalArgumentException("Cannot find by columnIdLinkToGo: $newColumnId") }
        val originOrder = originLink.order
        val newOrder = reorderLinkDto.newOrder

        // If link moves to same column
        if (newColumn.id == originLink.linkColumn.id) {
            if (originOrder < newOrder) {
                linkRepository.findByLinkColumn(originColumn).filter { it.order in (originOrder + 1)..(newOrder) }.map { it.order = it.order-1; it }.forEach{ linkRepository.save(it) }
            } else {
                linkRepository.findByLinkColumn(originColumn).filter { it.order in (newOrder)..(originOrder - 1) }.map { it.order = it.order+1; it }.forEach{ linkRepository.save(it) }
            }
            originLink.order = newOrder
            linkRepository.save(originLink)
            return findAll()
        }

        // If link moves to another column
        linkRepository.findByLinkColumn(originColumn).filter { it.order > originOrder }.map { it.order = it.order-1; it }.forEach{ linkRepository.save(it) }
        linkRepository.findByLinkColumn(newColumn).filter { it.order >= newOrder }.map { it.order = it.order+1; it }.forEach{ linkRepository.save(it) }

        originLink.linkColumn = newColumn
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
        @field:ManyToOne(targetEntity = LinkColumn::class, fetch = FetchType.LAZY)
        @field:JoinColumn(name = "link_column_id")
        var linkColumn: LinkColumn,
        @field:Column(name = "`order`")
        var order: Int

) {
    fun toDto(): LinkDto = LinkDto(
            id = this.id,
            url = this.url,
            content = this.content,
            linkColumn = this.linkColumn.toDto(),
            order = this.order
    )

    companion object {
        fun fromDto(dto: LinkDto) = Link(
                id = dto.id,
                url = dto.url,
                content = dto.content,
                linkColumn = LinkColumn.fromDto(dto.linkColumn),
                order = dto.order
        )

        fun fromDto(dto: CreateLinkDto, linkColumnDto: LinkColumnDto, order: Int) = Link(
                url = dto.url,
                content = dto.content,
                linkColumn = LinkColumn.fromDto(linkColumnDto),
                order = order
        )
    }
}

data class LinkDto(
        var id: Long,
        var url: String,
        var content: String,
        var linkColumn: LinkColumnDto,
        var order: Int
)

data class CreateLinkDto(
        val url: String,
        val content: String,
        val linkColumnId: Long,
        val email: String
)
data class UserWithLinksDto(
        val user: UserDto,
        val links: List<LinkDto>
)
data class ReorderLinkDto(
        val newColumnId: Long,
        val newOrder: Int
)