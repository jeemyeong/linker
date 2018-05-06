package linker;

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 01/05/2018
 * Time: 9:55 PM
 */
@Repository
interface LinkColumnRepository : JpaRepository<LinkColumn, Long>

@CrossOrigin
@RestController
@RequestMapping("/columns")
class LinkColumnEntityController(val linkColumnService: LinkColumnEntityService) {

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long) = linkColumnService.findById(id)

    @GetMapping("/all")
    fun all() = linkColumnService.findAll().sortedBy { it.order }

    @PostMapping("/")
    fun new(@RequestBody createLinkColumnDto: CreateLinkColumnDto) = linkColumnService.newColumn(createLinkColumnDto)

    @PostMapping("/reorder/{id}")
    fun reorder(@PathVariable id: Long, @RequestBody reorderLinkColumnDto: ReorderLinkColumnDto) = linkColumnService.reorderColumn(id, reorderLinkColumnDto)
}

@Service
class LinkColumnEntityService(val linkColumnRepository: LinkColumnRepository, val userRepository: UserRepository) {
    fun findById(id: Long) = linkColumnRepository.findById(id)

    fun findAll(): List<LinkColumn> = linkColumnRepository.findAll().sortedBy { it.order }

    fun newColumn(createLinkColumnDto: CreateLinkColumnDto): LinkColumn {
        val email = createLinkColumnDto.email
        val user = Optional.ofNullable(userRepository.findByEmail(email).firstOrNull()).orElseThrow { throw IllegalArgumentException("Cannot find by email: $email") }
        return linkColumnRepository.save(LinkColumn.fromDto(createLinkColumnDto, user.toDto()))
    }

    fun reorderColumn(linkColumnId: Long, reorderLinkColumnDto: ReorderLinkColumnDto): List<LinkColumn> {
        val originLinkColumn = linkColumnRepository.findById(linkColumnId).orElseThrow { throw IllegalArgumentException("Cannot find by linkColumnId: $linkColumnId") }
        val newOrder = reorderLinkColumnDto.newOrder
        val originOrder = originLinkColumn.order
        if (originOrder < newOrder) {
            linkColumnRepository.findAll().filter { it.order in (originOrder + 1)..(newOrder) }.map { it.order = it.order-1; it }.forEach{ linkColumnRepository.save(it) }
        } else {
            linkColumnRepository.findAll().filter { it.order in (newOrder)..(originOrder - 1) }.map { it.order = it.order+1; it }.forEach{ linkColumnRepository.save(it) }
        }
        originLinkColumn.order = newOrder
        linkColumnRepository.save(originLinkColumn)
        return findAll()
    }
}

@Entity
@Table(name = "link_columns")
data class LinkColumn(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        val title: String,
        @field:ManyToOne(targetEntity = User::class, fetch = FetchType.LAZY)
        @field:JoinColumn(name = "user_id")
        @field:JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        val user: User,
        @field:Column(name = "`order`")
        var order: Int
) {
    fun toDto(): LinkColumnDto = LinkColumnDto(
        id = this.id,
        title = this.title,
        user = this.user.toDto(),
        order = this.order
    )

    companion object {
        fun fromDto(dto: LinkColumnDto) = LinkColumn(
                id = dto.id,
                title = dto.title,
                user = User.fromDto(dto.user),
                order = dto.order
        )
        fun fromDto(dto: CreateLinkColumnDto, userDto: UserDto) = LinkColumn(
                title = dto.title,
                user = User.fromDto(userDto),
                order = dto.order
        )
    }
}

data class LinkColumnDto(
        var id: Long,
        var title: String,
        var user: UserDto,
        val order: Int
)
data class CreateLinkColumnDto(
        val title: String,
        val email: String,
        val order: Int
)
data class ReorderLinkColumnDto(
        val newOrder: Int
)