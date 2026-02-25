import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockContent } from '../../data/mockData';
import { Search, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = mockContent.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const publishedContent = filteredContent.filter((c) => c.status === 'published');
  const draftContent = filteredContent.filter((c) => c.status === 'draft');

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      case 'quiz':
        return '❓';
      case 'presentation':
        return '📊';
      default:
        return '📁';
    }
  };

  const renderContentCard = (content: typeof mockContent[0]) => (
    <Card key={content.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">{getContentIcon(content.type)}</span>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="line-clamp-1">{content.title}</h3>
                <Badge
                  className={
                    content.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }
                >
                  {content.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-blue-100 text-blue-700 text-xs">{content.type}</Badge>
                <span className="text-sm text-gray-600">{content.course}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{content.views} views</span>
                </div>
                <span>•</span>
                <span>Created {content.createdDate}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Content Library</h1>
        <p className="text-gray-600">Browse and manage all your educational content</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Content ({filteredContent.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedContent.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftContent.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredContent.map(renderContentCard)}
          </div>
          {filteredContent.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No content found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {publishedContent.map(renderContentCard)}
          </div>
          {publishedContent.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No published content found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {draftContent.map(renderContentCard)}
          </div>
          {draftContent.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No draft content found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
