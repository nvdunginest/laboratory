using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Laboratory.Web.Api.Models;

[Table("attachments")]
public class Attachment
{
    [Key]
    [Column("id")]
    public Guid Id { get; private set; }

    [Column("filename")]
    public string Filename { get; private set; }

    [Column("file_path")]
    public string FilePath { get; private set; }


    [ForeignKey(nameof(Request))]
    [Column("request_id")]
    public Guid RequestId { get; private set; }
    public Request Request { get; private set; }

    public Attachment(string filename, string filePath, Guid requestId)
    {
        this.Id = Guid.NewGuid();
        this.Filename = filename;
        this.FilePath = filePath;
        this.RequestId = requestId;
    }
}